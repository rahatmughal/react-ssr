// server/server.js
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

const app = express();


app.get("*", (req, res) => {
  // const entryPoint = ["/main.js"];

  const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
    {
      // bootstrapScripts: entryPoint,
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.write(`<!DOCTYPE html>\n<html lang="en">\n\<head>\n\t<meta charset="utf-8">\n\t<link rel="icon" href="/favicon.ico"/>\n\t<meta name="viewport" content="width=device-width,initial-scale=1"/>\n\t<meta name="theme-color" content="#000000"/>\n\t<meta name="description" content="Web site created using create-react-app"/>\n\t<link rel="apple-touch-icon" href="/logo192.png"/>\n\t<link rel="manifest" href="/manifest.json"/>\n\t<title>React App</title>\n\t<script defer="defer" src="/static/js/main.2527e97a.js"></script>\n\t</head>\n<body>\n\t<noscript>You need to enable JavaScript to run this app.</noscript>\n\t`);
        pipe(res);
        res.write(`\n<body>\n</html>`);
      },
      onShellError() {
        res.statusCode = 500;
        res.send("<!doctype html><p>Loading...</p>");
      },
      },
  );
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
