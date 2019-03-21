import compression from "compression";
import express from "express";
import React from "react";
import ReactDOMServer, { renderToNodeStream } from "react-dom/server";
import styled, { ServerStyleSheet } from "styled-components";

const app = express();
const port = process.env.PORT || 3000;

app.get("/p/:partnerId", function(req, res) {
  const Title = styled.h3({
    color: "purple"
  });

  const element = <Title>{req.params.partnerId}</Title>;

  const sheet = new ServerStyleSheet();
  const jsx = sheet.collectStyles(element);
  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

  stream.pipe(res);
});

app.use(compression);

app.listen(port, function() {
  console.log(`Example app on: http://localhost:${port}`);
});
