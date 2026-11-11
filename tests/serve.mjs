import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
http
  .createServer((req, res) => {
    let name = path.resolve(
      root,
      "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
    );
    if (!name.startsWith(root + path.sep) && name !== root) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(name) && fs.statSync(name).isDirectory())
      name = path.join(name, "index.html");
    if (!fs.existsSync(name)) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(fs.readFileSync(path.join(root, "404.html")));
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[path.extname(name)] ?? "application/octet-stream",
    });
    fs.createReadStream(name).pipe(res);
  })
  .listen(4173, "127.0.0.1");
