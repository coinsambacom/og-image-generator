import { CanvasRenderingContext2D } from "canvas";

export const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  line_width: number,
  line_height: number
) => {
  let line = "";
  const paragraphs = text.split("\n");

  for (let i = 0; i < paragraphs.length; i++) {
    const words = paragraphs[i].split(" ");
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > line_width && n > 0) {
        context.fillText(line, x - (context.measureText(line).width / 2), y);
        line = words[n] + " ";
        y += line_height;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x - (context.measureText(line).width / 2), y);
    y += line_height;
    line = "";
  }

  return y;
};

