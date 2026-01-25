export default function getImageAverageColor(imageUrl, callback) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageUrl;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let r = 0, g = 0, b = 0;
    let pixelCount = 0;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha === 0) continue; // Skip fully transparent pixels

      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      pixelCount++;
    }

    if (pixelCount === 0) {
      callback("rgb(255, 255, 255)");
      return;
    }

    r = Math.round(r / pixelCount);
    g = Math.round(g / pixelCount);
    b = Math.round(b / pixelCount);

    callback(`rgb(${r}, ${g}, ${b})`);
  };

  img.onerror = function () {
    callback("rgb(255, 255, 255)");
  };
}
