// Package the supplied artwork without redrawing or generating a new mark.
import fs from "node:fs";
import sharp from "sharp";
const source = process.argv[2];
if (!source)
  throw new Error(
    "Usage: node scripts/prepare-brand.mjs <brand-presentation.png>",
  );
const directory = "public/brand";
const sourceImage = sharp(source);
const symbol = await sourceImage
  .clone()
  .extract({ left: 128, top: 71, width: 232, height: 239 })
  .png()
  .toBuffer();
const wordmark = await sourceImage
  .clone()
  .extract({ left: 406, top: 133, width: 459, height: 88 })
  .png()
  .toBuffer();
const appIcon = await sourceImage
  .clone()
  .extract({ left: 1503, top: 827, width: 90, height: 91 })
  .png()
  .toBuffer();
fs.writeFileSync(`${directory}/nisimin-symbol.png`, symbol);
fs.writeFileSync(`${directory}/nisimin-wordmark.png`, wordmark);
const image = (buffer) => `data:image/png;base64,${buffer.toString("base64")}`;
const svg = (body, viewBox, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
const symbolSvg = svg(
  `<image width="232" height="239" href="${image(symbol)}"/>`,
  "0 0 232 239",
  "NISIMIN symbol — supplied artwork",
);
fs.writeFileSync(`${directory}/nisimin-symbol.svg`, symbolSvg);
const lockup = (dark = false) =>
  svg(
    `${dark ? '<defs><filter id="white"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 -0.3333 -0.3333 -0.3333 0 1"/></filter></defs>' : ""}<image x="0" y="0" width="80" height="82.4" href="${image(symbol)}"/><image x="98" y="22" width="250" height="48" ${dark ? 'filter="url(#white)"' : ""} href="${image(wordmark)}"/>`,
    "0 0 350 84",
    `NISIMIN ${dark ? "dark-surface " : ""}logo — supplied artwork`,
  );
fs.writeFileSync(`${directory}/nisimin-logo.svg`, lockup());
fs.writeFileSync(`${directory}/nisimin-logo-dark.svg`, lockup(true));
const mono = await sourceImage
  .clone()
  .extract({ left: 544, top: 843, width: 49, height: 51 })
  .png()
  .toBuffer();
fs.writeFileSync(
  `${directory}/nisimin-symbol-mono.svg`,
  svg(
    `<image width="49" height="51" href="${image(mono)}"/>`,
    "0 0 49 51",
    "NISIMIN monochrome reference from supplied presentation",
  ),
);
fs.writeFileSync(
  "public/icon.svg",
  svg(
    `<image width="90" height="91" href="${image(appIcon)}"/>`,
    "0 0 90 91",
    "NISIMIN app icon",
  ),
);
await sharp(appIcon)
  .resize(180, 180)
  .png()
  .toFile("public/apple-touch-icon.png");
const social = svg(
  `<rect width="1200" height="630" fill="#fdfcf9"/><image x="70" y="50" width="48" height="49" href="${image(symbol)}"/><image x="132" y="61" width="190" height="36" href="${image(wordmark)}"/><text x="72" y="258" font-family="Arial,sans-serif" font-size="77" letter-spacing="-4" fill="#101828">Technology that</text><text x="72" y="350" font-family="Arial,sans-serif" font-size="77" letter-spacing="-4" fill="#101828">moves people</text><text x="72" y="442" font-family="Arial,sans-serif" font-size="77" letter-spacing="-4" fill="#606773">forward.</text><image x="820" y="200" width="280" height="288" href="${image(symbol)}"/><text x="73" y="563" font-family="Arial,sans-serif" font-size="17" fill="#606773">Thoughtful technology. Meaningful progress.</text>`,
  "0 0 1200 630",
  "NISIMIN — Technology that moves people forward.",
).replace("<svg ", '<svg width="1200" height="630" ');
fs.writeFileSync(`${directory}/social.svg`, social);
await sharp(Buffer.from(social)).png().toFile(`${directory}/social.png`);
