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
const drafts = ["privacy", "terms"];
const canonical = (route) => `https://nisimin.com/${route}${route ? "/" : ""}`;
const read = (p) => fs.readFileSync(path.join("out", p), "utf8");
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(([tag]) =>
    Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
        key,
        value,
      ]),
    ),
  );
test("every exported page has unique metadata, canonical, social card, and a single h1", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const route of routes) {
    const html = read(path.join(route, "index.html"));
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title);
    assert.ok(!titles.has(title));
    titles.add(title);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    const links = tags(html, "link");
    assert.deepEqual(
      links.filter((link) => link.rel === "canonical").map((link) => link.href),
      [canonical(route)],
    );
    const meta = tags(html, "meta");
    const value = (key) => {
      const matches = meta.filter(
        (tag) => tag.name === key || tag.property === key,
      );
      assert.equal(
        matches.length,
        1,
        `${route}: ${key} must occur exactly once`,
      );
      return matches[0].content;
    };
    const description = value("description");
    assert.ok(description);
    assert.ok(!descriptions.has(description));
    descriptions.add(description);
    assert.equal(value("og:title"), title);
    assert.equal(value("og:description"), description);
    assert.equal(value("og:url"), canonical(route));
    assert.equal(value("og:site_name"), "NISIMIN");
    assert.equal(value("og:type"), "website");
    assert.equal(value("og:image"), "https://nisimin.com/brand/social.png");
    assert.equal(value("og:image:width"), "1200");
    assert.equal(value("og:image:height"), "630");
    assert.ok(value("og:image:alt"));
    assert.equal(value("twitter:card"), "summary_large_image");
    assert.equal(value("twitter:title"), title);
    assert.equal(value("twitter:description"), description);
    assert.equal(value("twitter:image"), value("og:image"));
    assert.equal(
      value("robots"),
      `${drafts.includes(route) ? "noindex" : "index"}, follow`,
    );
    if (route === "")
      assert.equal(title, "NISIMIN | Technology for Sports and Education");
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
  const sitemap = read("sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    ([, url]) => url,
  );
  assert.deepEqual(
    urls.sort(),
    routes
      .filter((route) => !drafts.includes(route))
      .map(canonical)
      .sort(),
  );
  assert.ok(!sitemap.includes("<lastmod>"));
  assert.match(read("robots.txt"), /User-Agent: \*\nAllow: \//i);
  assert.ok(!read("robots.txt").includes("Disallow:"));
  for (const route of ["privacy", "terms"])
    assert.ok(read(`${route}/index.html`).includes("Draft — review required."));
  assert.ok(read("_headers").includes("X-Content-Type-Options: nosniff"));
});
test("each page has a single linked Organization and WebSite graph with local branding", () => {
  for (const route of routes) {
    const html = read(path.join(route, "index.html"));
    const scripts = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ];
    assert.equal(scripts.length, 1);
    const data = JSON.parse(scripts[0][1]);
    assert.equal(data["@context"], "https://schema.org");
    const graph = data["@graph"];
    assert.equal(graph.length, 2);
    const organization = graph.find((node) => node["@type"] === "Organization");
    const website = graph.find((node) => node["@type"] === "WebSite");
    assert.equal(organization.name, "NISIMIN");
    assert.equal(organization.url, canonical(""));
    assert.ok(organization.description.includes("PlayTown and EduNisi"));
    assert.ok(!("sameAs" in organization));
    const logo = new URL(organization.logo);
    assert.equal(logo.origin, "https://nisimin.com");
    assert.ok(fs.existsSync(path.join("out", logo.pathname)));
    assert.equal(website.url, canonical(""));
    assert.equal(website.publisher["@id"], organization["@id"]);
  }
});
test("the exported not-found page is noindex and has no homepage canonical", () => {
  const html = read("404.html");
  assert.ok(
    tags(html, "meta").some(
      (tag) => tag.name === "robots" && tag.content.includes("noindex"),
    ),
  );
  assert.ok(!tags(html, "link").some((tag) => tag.rel === "canonical"));
  assert.ok(html.includes("Page not found | NISIMIN"));
});
test("analytics is disabled without configuration", () => {
  if (!process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN)
    assert.ok(
      !read("index.html").includes(
        'src="https://static.cloudflareinsights.com/beacon.min.js"',
      ),
    );
});
