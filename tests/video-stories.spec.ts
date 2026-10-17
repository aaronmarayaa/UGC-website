import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test.beforeEach(async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("all supplied video previews play without autoplay and pause when scrolled away", async ({
  page,
}) => {
  test.setTimeout(90000);
  const sources = JSON.parse(
    await readFile("public/videos/sources.json", "utf8"),
  ) as {
    file: string;
    width: number;
    height: number;
    duration: number;
  }[];
  const groups = [
    ["Lifestyle", 3],
    ["Skincare", 2],
    ["Travel", 2],
    ["Unboxing", 4],
    ["Shopping", 1],
    ["Product Reviews", 2],
  ] as const;
  await expect(page.locator(".video-spread")).toHaveCount(6);
  await expect(page.locator(".video-spread h3")).toHaveCount(0);
  const played: string[] = [];
  for (const [category, count] of groups) {
    const spread = page.getByRole("article", {
      name: `${category} video collection`,
    });
    await expect(spread.locator("video")).toHaveCount(count);
    for (let index = 0; index < count; index++) {
      const figure = spread.locator(".video-print").nth(index);
      const video = figure.locator("video");
      await video.scrollIntoViewIfNeeded();
      expect(
        await video.evaluate((element: HTMLVideoElement) => element.paused),
      ).toBe(true);
      await expect(video).not.toHaveAttribute("autoplay", "");
      const play = figure.getByRole("button", { name: /^Play video:/ });
      await expect(play).toBeVisible();
      await video.evaluate((element: HTMLVideoElement) => {
        element.muted = true;
      });
      await play.click();
      await expect(video).toHaveAttribute("controls", "");
      await expect(play).not.toBeVisible();
      await expect
        .poll(() =>
          video.evaluate((element: HTMLVideoElement) => element.currentTime),
        )
        .toBeGreaterThan(0.1);
      const metadata = await video.evaluate((element: HTMLVideoElement) => ({
        file: decodeURIComponent(
          new URL(element.currentSrc).pathname.replace("/videos/", ""),
        ),
        duration: element.duration,
        width: element.videoWidth,
        height: element.videoHeight,
      }));
      const original = sources.find((source) => source.file === metadata.file)!;
      expect(original).toBeDefined();
      expect(metadata.width).toBe(original.width);
      expect(metadata.height).toBe(original.height);
      expect(metadata.duration).toBeCloseTo(original.duration, 0);
      played.push(original.file);
      await page.locator("#trusted-by").evaluate((section) =>
        window.scrollTo({
          top: section.getBoundingClientRect().top + window.scrollY,
          behavior: "instant",
        }),
      );
      await expect(video).not.toBeInViewport();
      await expect
        .poll(() =>
          video.evaluate((element: HTMLVideoElement) => element.paused),
        )
        .toBe(true);
    }
  }
  expect(new Set(played).size).toBe(14);
});

test("a failed video offers a working download and retries the original file", async ({
  page,
}) => {
  const spread = page.locator(".video-spread").first();
  await page.route("**/videos/lifestyle/lifestyle-1.mp4", (route) =>
    route.fulfill({
      status: 200,
      contentType: "video/mp4",
      body: "invalid video bytes",
      headers: { "cache-control": "no-store" },
    }),
  );
  const video = spread.locator("video").first();
  await video.scrollIntoViewIfNeeded();
  await video.evaluate((element: HTMLVideoElement) => {
    element.preload = "metadata";
    element.load();
  });
  await expect(spread.getByRole("alert")).toContainText(
    "This clip couldn't load.",
  );
  await page.unroute("**/videos/lifestyle/lifestyle-1.mp4");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    spread.getByRole("link", { name: "Download clip" }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("lifestyle-1.mp4");
  expect((await readFile((await download.path())!)).length).toBeGreaterThan(
    2000000,
  );
  await spread.getByRole("button", { name: "Retry clip" }).click();
  await expect(spread.getByRole("alert")).not.toBeVisible();
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.readyState),
    )
    .toBeGreaterThanOrEqual(1);
  await video.scrollIntoViewIfNeeded();
  await video.evaluate((element: HTMLVideoElement) => {
    element.muted = true;
  });
  await spread
    .getByRole("button", { name: "Play video: A glimpse of the day" })
    .click();
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.1);
});

test("video spreads alternate on desktop and reflow above players on phones; supplied logos load", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    const spreads = page.locator(".video-spread");
    for (let index = 0; index < 6; index++) {
      const copy = (await spreads
        .nth(index)
        .locator(".video-description")
        .boundingBox())!;
      const media = (await spreads
        .nth(index)
        .locator(".video-collection")
        .boundingBox())!;
      if (width < 900)
        expect(
          copy.y + copy.height,
          `${width}px spread ${index + 1}`,
        ).toBeLessThan(media.y);
      else if (index % 2 === 0)
        expect(copy.x + copy.width).toBeLessThan(media.x);
      else expect(media.x + media.width).toBeLessThan(copy.x);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBe(0);
  }
  await page.locator("#trusted-by").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { name: "Trusted by:" }),
  ).toBeVisible();
  for (const brand of [
    "Keepigo",
    "NATPAT",
    "Simply Gourmet",
    "Spinnakers",
    "The Fave Stuff",
    "Upfairy",
  ]) {
    const logo = page.getByRole("img", { name: brand, exact: true });
    await expect(logo).toBeVisible();
    await expect
      .poll(() =>
        logo.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
});

test("preview rows support keyboard play, one active clip, and horizontal browsing", async ({
  page,
}) => {
  const collection = page.getByRole("group", {
    name: "Lifestyle video previews",
  });
  const clips = collection.locator("video");
  await collection.scrollIntoViewIfNeeded();
  await clips.first().evaluate((element: HTMLVideoElement) => {
    element.muted = true;
  });
  const firstPlay = collection.getByRole("button", {
    name: "Play video: A glimpse of the day",
  });
  await firstPlay.focus();
  await page.keyboard.press("Enter");
  await expect
    .poll(() =>
      clips
        .first()
        .evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.1);
  await clips.nth(1).evaluate((element: HTMLVideoElement) => {
    element.muted = true;
  });
  await collection
    .getByRole("button", { name: "Play video: Life lately" })
    .click();
  await expect
    .poll(() =>
      clips.nth(1).evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.1);
  expect(
    await clips.first().evaluate((element: HTMLVideoElement) => element.paused),
  ).toBe(true);
  await page.setViewportSize({ width: 375, height: 812 });
  await collection.scrollIntoViewIfNeeded();
  await collection.evaluate((element) =>
    element.scrollTo({ left: 0, behavior: "instant" }),
  );
  await collection.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => collection.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
  await expect
    .poll(() =>
      clips.nth(1).evaluate((element: HTMLVideoElement) => element.paused),
    )
    .toBe(true);
});

test("hero images depart toward the sides, restore on return, and respect reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".hero-portrait").waitFor();
  const heading = page.locator("#hero-title");
  const initialX = (await heading.boundingBox())!.x;
  await page.evaluate(() =>
    scrollTo(
      0,
      document.querySelector(".hero")!.getBoundingClientRect().height * 0.35,
    ),
  );
  const hero = page.locator(".hero");
  await expect
    .poll(() =>
      hero.evaluate((element) =>
        Number(element.style.getPropertyValue("--hero-departure")),
      ),
    )
    .toBeGreaterThan(0.2);
  const directions = await page.evaluate(() => ({
    left: parseFloat(
      getComputedStyle(document.querySelector(".cover-citrus")!).translate,
    ),
    right: parseFloat(
      getComputedStyle(document.querySelector(".cover-white-blossoms")!)
        .translate,
    ),
  }));
  expect(directions.left).toBeLessThan(0);
  expect(directions.right).toBeGreaterThan(0);
  expect((await heading.boundingBox())!.x).toBe(initialX);
  await page.evaluate(() => scrollTo(0, 0));
  await expect
    .poll(() =>
      hero.evaluate((element) =>
        Number(element.style.getPropertyValue("--hero-departure")),
      ),
    )
    .toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => scrollTo(0, 400));
  await expect
    .poll(() =>
      hero.evaluate((element) =>
        Number(element.style.getPropertyValue("--hero-departure")),
      ),
    )
    .toBe(0);
  expect(
    await page
      .locator(".cover-citrus")
      .evaluate((element) => parseFloat(getComputedStyle(element).translate)),
  ).toBe(0);
});
