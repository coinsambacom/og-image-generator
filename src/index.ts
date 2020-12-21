import express from "express";
import { createCanvas } from "canvas";

const routes = express.Router();

const app = express();

routes.get("/og", (req, res) => {
  const { text } = req.query as { text: string };

  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);

  context.font = "bold 70pt Menlo";
  context.textAlign = "center";
  context.textBaseline = "top";
  //   context.fillStyle = "#3574d4";

  const textWidth = context.measureText(text).width;
  context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);
  context.fillStyle = "#fff";
  context.fillText(text, 600, 170);

  context.fillStyle = "#fff";
  context.font = "bold 30pt Menlo";
  context.fillText("coinsamba.com", 600, 530);

  const buffer = canvas.toBuffer("image/png");
  res.contentType("image/jpeg");
  res.send(buffer);
});

app.use(routes);

app.listen(80);
