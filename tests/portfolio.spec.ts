import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });
  page.on("console", (message) => {
    if (message.type() === "error") throw new Error(message.text());
  });
  await page.goto("/");
});

test("Instagram results retain the supplied screenshot without repeated metrics", async ({ page }) => {
  await page.locator(".cover-results").click();
  await expect(page).toHaveURL(/#results$/);
  const results = page.locator("#results");
  await expect(results.locator(".results-screenshot figcaption")).toHaveText(
    "From Marella's Instagram: @bymarella",
  );
  await expect(results.getByRole("img", { name: /^Marella's Instagram Insights:/ })).toBeVisible();
  await expect(results.locator(".insight-values, .results-source")).toHaveCount(0);
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
});

test("remaining navigation and hero links lead to existing sections", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Marella Almazar");
  const nav = page.getByRole("navigation", { name: "Main navigation", exact: true });
  for (const [label, hash] of [
    ["Videos", "#videos"],
    ["Results", "#results"],
    ["About Marella", "#about"],
  ]) {
    await nav.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(hash + "$"));
  }
  await page.getByRole("link", { name: "Back to the beginning" }).click();
  await expect(page).toHaveURL(/#home$/);
  await page.getByRole("link", { name: "Watch the stories" }).click();
  await expect(page).toHaveURL(/#videos$/);
  await page.getByRole("link", { name: "Turn the page" }).click();
  await expect(page).toHaveURL(/#about$/);
  const missingTargets = await page.locator('a[href^="#"]').evaluateAll(links =>
    links.map(link => link.getAttribute("href")!).filter(href => !document.getElementById(href.slice(1))),
  );
  expect(missingTargets).toEqual([]);
});

test("About text sits left of the video and analytics with the requested extras removed", async ({ page }) => {
  const about = page.locator("#about");
  await expect(about.locator(".about-intro")).toContainText("business owner for the past five years");
  await expect(about.locator(".about-intro")).toContainText("full-time UGC creator based in Canada");
  await expect(about.locator(".about-intro")).toContainText("first-time mom");
  await expect(about.locator(".about-strengths dt")).toHaveText([
    "Market research", "Marketing", "Data analysis", "Content creation",
  ]);
  await expect(page.locator("#moodboard, #contact")).toHaveCount(0);
  await expect(about.locator("img, button, a, .about-signature, .about-business-note")).toHaveCount(0);
  for (const width of [375, 768, 1100, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    const copy = (await about.boundingBox())!;
    const results = (await page.locator("#results").boundingBox())!;
    if (width >= 1100) {
      expect(copy.x + copy.width).toBeLessThan(results.x);
      expect(Math.abs(copy.y - results.y)).toBeLessThan(1);
    } else expect(copy.y + copy.height).toBeLessThan(results.y);
  }
});

test("mobile navigation, width range, touch targets, reduced motion, and accessibility", async ({ page }) => {
  for (const width of [320, 375, 600, 768, 900, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  for (const [label, hash] of [
    ["Videos", "#videos"],
    ["Results", "#results"],
    ["About Marella", "#about"],
  ]) {
    await menu.click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: label }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page).toHaveURL(new RegExp(hash + "$"));
  }
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  const tooSmall = await page.locator("button:visible").evaluateAll(elements =>
    elements.filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.width < 43 || rect.height < 43;
    }).map(element => element.textContent),
  );
  expect(tooSmall).toEqual([]);
  await page.getByRole("link", { name: "Back to the beginning" }).click();
  await page.screenshot({ path: "qa/mobile.png", fullPage: true });
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
  await menu.click();
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
});

test("homepage shows the identity and portrait within the first screen", async ({ page }) => {
  for (const viewport of [
    { width: 1366, height: 768 },
    { width: 375, height: 812 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const selector of ["#hero-title", ".hero-name-front", ".portrait-scene"]) {
      const box = await page.locator(selector).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y + box!.height).toBeLessThan(viewport.height);
    }
  }
});
