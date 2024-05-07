// server.js
require("dotenv").config();
const { createServer } = require("http");
const open = require("open");
const { parse } = require("url");
const next = require("next");

const { APP_PORT, NODE_ENV } = process.env;

const dev = NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = dev ? 3000 : APP_PORT;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  dev && open(`http://localhost:${port}`);
});
