import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/products/",
  "/products/playtown/",
  "/products/edunisi/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
];
test("all pages render, fit the viewport, and pass accessibility checks", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations,
      `${route}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
});
test("products and contact calls to action lead to real destinations", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore our products", exact: true })
    .click();
  await expect(page).toHaveURL(/\/products\/$/);
  await page.getByRole("link").filter({ hasText: "Discover PlayTown" }).click();
  await expect(page).toHaveURL(/\/products\/playtown\/$/);
  await expect(
    page.getByRole("link", { name: "Ask about PlayTown" }),
  ).toHaveAttribute("href", /^mailto:hello@nisimin.com\?subject=PlayTown/);
});
test("mobile navigation supports keyboard dismissal and navigation", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  const toggle = page.locator('button[aria-controls="mobile-navigation"]');
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation", exact: true })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("reduced motion keeps content available", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Technology that moves people forward.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore our products", exact: true }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `/tmp/nisimin-${testInfo.project.name}.png`,
    fullPage: true,
  });
});

test("layouts fit small phones, tablets, and wide screens", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
  }
});
