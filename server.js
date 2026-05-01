import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const __dirname = path.resolve();

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use( async (req, res) => {
    try {
      const url = req.originalUrl;


      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );


      template = await vite.transformIndexHtml(url, template);


      const { render } = await vite.ssrLoadModule(
        "/src/entry-server.jsx"
      );


const { appHtml, initialData } = await render(url);

const html = template
  .replace("<!--app-html-->", appHtml)
  .replace(
    "<!--initial-data-->",
    `<script>window.__INITIAL_DATA__=${JSON.stringify(initialData)}</script>`
  );

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(5175, () => {
    console.log("SSR running at http://localhost:5175");
  });
}

createServer();