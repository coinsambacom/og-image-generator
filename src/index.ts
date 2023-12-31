import express from "express";
import { createCanvas, loadImage, registerFont } from "canvas";
import { wrapText } from "./helpers";
import { env } from "./env";

const fontFamily = "CoolveticaRg";

(async () => {
  registerFont(`src/static/fonts/${fontFamily}.otf`, {
    family: fontFamily,
  });

  const background = await loadImage("src/static/img/background-1.jpg");

  const routes = express.Router();
  const app = express();

  routes.get<any, any, any, { text: string; b64?: boolean }>(
    "/og.jpg",
    (req, res) => {
      let { text, b64 } = req.query;

      if (!text || typeof text !== "string") {
        res.status(500).send({ error: "only strings are allowed" });
      }

      if (b64) {
        text = Buffer.from(text, "base64").toString("utf-8");
      } else {
        text = decodeURI(unescape(text));
      }

      const padding = 80;
      const width = 1200;
      const height = 630;

      const canvas = createCanvas(width, height);

      const context = canvas.getContext("2d");

      context.drawImage(background, 0, 0, width, height);

      context.font = `bold 70pt Coolvetica Rg`;
      context.fillStyle = "#fff";

      const centerX = width / 2;

      wrapText(context, text, centerX, 200, width - 2 * padding, 90);

      const buffer = canvas.toBuffer("image/jpeg", { quality: 1 });
      res.contentType("image/jpeg");
      res.send(buffer);
    }
  );

  app.use(routes);

  app.listen(env.PORT, () =>
    console.info(`og-image-generator server is running on port ${env.PORT}`)
  );
})();
