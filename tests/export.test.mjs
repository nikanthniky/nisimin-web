import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const routes = [
  "",
  "products",
  "products/playtown",
  "products/edunisi",
  "about",
  "contact",
  "privacy",
  "terms",
];
const read = (p) => fs.readFileSync(path.join("out", p), "utf8");
test("every exported page has unique metadata, canonical, social card, and a single h1", () => {
  const titles = new Set();
  for (const route of routes) {
    const html = read(path.join(route, "index.html"));
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title);
    assert.ok(!titles.has(title));
    titles.add(title);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(
      html.includes(`href="https://nisimin.com/${route}${route ? "/" : ""}"`),
    );
    assert.ok(html.includes('property="og:image"'));
    assert.ok(html.includes('name="twitter:card"'));
  }
});
test("exported internal links and local assets resolve", () => {
  for (const route of routes) {
    const html = read(path.join(route, "index.html"));
    for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) {
      const url = match[1];
      if (url.startsWith("//")) continue;
      const file = path.join("out", url);
      assert.ok(fs.existsSync(file), `${route}: ${url}`);
      if (fs.statSync(file).isDirectory())
        assert.ok(fs.existsSync(path.join(file, "index.html")));
    }
  }
});
test("crawl files, legal draft notices and production security headers exist", () => {
  assert.ok(read("robots.txt").includes("https://nisimin.com/sitemap.xml"));
  for (const route of routes)
    assert.ok(
      read("sitemap.xml").includes(
        `https://nisimin.com/${route}${route ? "/" : ""}`,
      ),
    );
  for (const route of ["privacy", "terms"])
    assert.ok(read(`${route}/index.html`).includes("Draft — review required."));
  assert.ok(read("_headers").includes("X-Content-Type-Options: nosniff"));
});
test("analytics is disabled without configuration", () => {
  if (!process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN)
    assert.ok(
      !read("index.html").includes(
        'src="https://static.cloudflareinsights.com/beacon.min.js"',
      ),
    );
});
