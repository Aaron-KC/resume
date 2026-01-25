import { toCanvas } from "html-to-image";

export const captureElement = (element) => {

  toCanvas(document.getElementById("myComponent")).then((canvas) => {
    // Resize the canvas manually
    const scaledCanvas = document.createElement("canvas");
    const scale = 0.5;
    scaledCanvas.width = canvas.width * scale;
    scaledCanvas.height = canvas.height * scale;

    const ctx = scaledCanvas.getContext("2d");
    ctx.scale(scale, scale);
    ctx.drawImage(canvas, 0, 0);

    const dataUrl = scaledCanvas.toDataURL("image/png", 0.7); // quality
    // Use or download dataUrl
  });
};
