import { test, expect } from "@playwright/test";

test("featured analytics video plays, pauses on exit, and sits beside its original screenshot", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("#trusted-by")).toHaveAttribute(
    "data-text-flow",
    "ready",
  );
  const results = page.locator("#results");
  await results.scrollIntoViewIfNeeded();
  const video = results.locator("video");
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute("preload", "none");
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await video.evaluate((v: HTMLVideoElement) => {
    v.muted = true;
  });
  const play = results.getByRole("button", {
    name: "Play video: Decorating my Armybomb",
  });
  await play.click();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0.1);
  expect(await video.evaluate((v: HTMLVideoElement) => v.duration)).toBeCloseTo(
    30.300635,
    1,
  );
  await expect(video).toHaveAttribute("controls", "");
  const original = results.locator(".results-screenshot img");
  const response = await page.request.get(
    (await original.getAttribute("src"))!,
  );
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/jpeg");
  await page.locator("#trusted-by").scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(true);
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    const film = (await results.locator(".results-film").boundingBox())!;
    const image = (await results.locator(".results-screenshot").boundingBox())!;
    if (width >= 600) expect(film.x + film.width).toBeLessThan(image.x);
    else expect(film.y + film.height).toBeLessThan(image.y);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBe(0);
  }
});

test("raised portrait aligns with logos and the full-width ribbon stays clear of copy", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator("#trusted-by");
  await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveAttribute("data-text-flow", "ready");
  for (const [width, height] of [
    [1100, 800],
    [1366, 768],
    [1440, 1000],
    [1920, 1080],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const image = document.querySelector<HTMLImageElement>(
            ".trusted-floral-swoosh",
          )!;
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext("2d")!;
          context.drawImage(image, 0, 0);
          const alpha = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          ).data;
          const art = image.getBoundingClientRect();
          const protectedAreas = [
            ...document.querySelectorAll(
              ".trusted-portrait-circle, .trusted-portrait-note",
            ),
          ].map((e) => e.getBoundingClientRect());
          const collisions: string[] = [];
          const walker = document.createTreeWalker(
            document.querySelector(".trusted-editorial")!,
            NodeFilter.SHOW_TEXT,
          );
          while (walker.nextNode()) {
            const node = walker.currentNode;
            for (const match of node.textContent!.matchAll(/\S+/g)) {
              const range = document.createRange();
              range.setStart(node, match.index!);
              range.setEnd(node, match.index! + match[0].length);
              for (const rect of range.getClientRects()) {
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;
                if (
                  protectedAreas.some(
                    (area) =>
                      centerX > area.left &&
                      centerX < area.right &&
                      centerY > area.top &&
                      centerY < area.bottom,
                  )
                )
                  collisions.push(match[0]);
                const x = Math.floor(
                  ((rect.x + rect.width / 2 - art.x) / art.width) *
                    canvas.width,
                );
                const y = Math.floor(
                  ((rect.y + rect.height / 2 - art.y) / art.height) *
                    canvas.height,
                );
                if (
                  x >= 0 &&
                  y >= 0 &&
                  x < canvas.width &&
                  y < canvas.height &&
                  alpha[(y * canvas.width + x) * 4 + 3] > 100
                )
                  collisions.push(match[0]);
              }
            }
          }
          return collisions;
        });
      })
      .toEqual([]);
    const logos = (await section.locator(".trusted-brands").boundingBox())!;
    const title = (await section.locator("h2").boundingBox())!;
    const portrait = (await section
      .locator(".trusted-portrait-circle")
      .boundingBox())!;
    const note = (await section
      .locator(".trusted-portrait-note")
      .boundingBox())!;
    expect(logos.y).toBeGreaterThan(title.y + title.height);
    expect(
      Math.abs(logos.y + logos.height / 2 - (portrait.y + portrait.height / 2)),
    ).toBeLessThan(2);
    expect(portrait.width).toBeGreaterThanOrEqual(130);
    expect(note.y).toBeGreaterThan(portrait.y + portrait.height);
    expect(note.y + note.height).toBeLessThanOrEqual(
      (await section.boundingBox())!.y + (await section.boundingBox())!.height,
    );
    await section.locator(".trusted-portrait-note").scrollIntoViewIfNeeded();
    await expect(section.locator(".trusted-portrait-note")).toBeInViewport({
      ratio: 0.999,
    });
    const ribbon = (await section
      .locator(".trusted-floral-swoosh")
      .boundingBox())!;
    const partners = (await section
      .locator(".trusted-partners")
      .boundingBox())!;
    const story = (await section.locator(".trusted-story").boundingBox())!;
    expect(partners.x + partners.width).toBeLessThan(story.x);
    expect(ribbon.x).toBeGreaterThanOrEqual(story.x);
    expect(ribbon.width).toBeLessThanOrEqual(story.width);
    expect(
      Math.abs(
        ribbon.x +
          ribbon.width -
          (await page.evaluate(() => document.documentElement.clientWidth)),
      ),
    ).toBeLessThan(1);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBe(0);
    expect(portrait.x).toBeLessThan(ribbon.x);
    expect(
      await section
        .locator("h2")
        .evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
    ).toBeLessThanOrEqual(64);
    for (const logo of await section.locator(".trusted-brand").all()) {
      expect(
        await logo.evaluate((e) => getComputedStyle(e).backgroundColor),
      ).toBe("rgba(0, 0, 0, 0)");
    }
  }
  await page.route("**/floral-serpentine-ribbon.png", (route) =>
    route.fulfill({ contentType: "image/png", body: "invalid image" }),
  );
  await page.reload();
  await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveAttribute("data-text-flow", "fallback");
  await expect(
    section.getByRole("heading", { name: "Details tell the story." }),
  ).toBeVisible();
  expect(
    await section
      .locator(".trusted-brand-field")
      .evaluate((e) => getComputedStyle(e).position),
  ).toBe("relative");
});
