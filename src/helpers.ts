export const wrapText = (
  context: any,
  text: string,
  x: number,
  y: number,
  line_width: number,
  line_height: number
) => {
  var line = "";
  var paragraphs = text.split("\n");
  for (var i = 0; i < paragraphs.length; i++) {
    var words = paragraphs[i].split(" ");
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > line_width && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += line_height;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
    y += line_height;
    line = "";
  }

  return y;
};
