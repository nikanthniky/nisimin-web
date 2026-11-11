import fs from "node:fs";
import { spawn } from "node:child_process";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";
const server = spawn(process.execPath, ["tests/serve.mjs"], {
  stdio: "ignore",
});
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch("http://127.0.0.1:4173");
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!ready) throw new Error("Static preview did not become ready.");
  browser = await chromium.launch({
    headless: true,
    args: ["--remote-debugging-port=9222"],
  });
  const result = await lighthouse("http://127.0.0.1:4173/", {
    port: 9222,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  if (!result) throw new Error("No Lighthouse result.");
  fs.writeFileSync(
    "/tmp/nisimin-lighthouse.json",
    JSON.stringify(result.lhr, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            Math.round((value.score ?? 0) * 100),
          ]),
        ),
        metrics: Object.fromEntries(
          [
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
          ].map((key) => [key, result.lhr.audits[key]?.displayValue]),
        ),
        issues: Object.values(result.lhr.audits)
          .filter((a) => a.score !== null && a.score < 1 && a.details)
          .map((a) => ({ id: a.id, title: a.title, score: a.score })),
      },
      null,
      2,
    ),
  );
} finally {
  await browser?.close();
  server.kill();
}
