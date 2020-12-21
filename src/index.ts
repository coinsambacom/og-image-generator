import express from "express";
import { createCanvas, loadImage } from "canvas";
import { wrapText } from "./helpers";

(async () => {
  const mainLogo = await loadImage("./img/main_logo_dark.png");
  const background = await loadImage("./img/background-1.jpg");

  const routes = express.Router();
  const app = express();

  routes.get("/og.jpg", (req, res) => {
    const { text } = req.query as { text: string };

    if (!text || typeof text !== "string")
      res.status(500).send({ error: "only strings are allowed" });

    const padding = 80;
    const width = 1200;
    const height = 630;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    context.drawImage(background, 0, 0, width, height);

    context.font = "bold 70pt Menlo";
    context.fillStyle = "#fff";

    wrapText(context, text, padding, 200, 1000, 90);

    const logoWidth = 270;
    const logoHeight = 76;

    context.drawImage(
      mainLogo,
      600 - logoWidth / 2,
      530,
      logoWidth,
      logoHeight
    );

    const buffer = canvas.toBuffer("image/png");
    res.contentType("image/jpeg");
    res.send(buffer);
  });

  app.use(routes);

  const port = process.env.PORT || 3131;

  app.listen(port, () =>
    console.info(`og image server is running on port ${process.env.port}`)
  );
})();
