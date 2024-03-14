export type ProcessingFunction = (input: ImageData, output: ImageData) => void;

export function grayscale(
  imageData: ImageData,
  outputImageData: ImageData,
): void {
  const input = imageData.data;
  const output = outputImageData.data;

  for (let y = 0; y < imageData.height; y += 1) {
    for (let x = 0; x < imageData.width; x += 1) {
      const offset = (y * imageData.width + x) * 4;

      const [r, g, b] = input.slice(offset, offset + 4);

      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      output[offset] = gray;
      output[offset + 1] = gray;
      output[offset + 2] = gray;
      output[offset + 3] = 255;
    }
  }
}

export function threshold(
  imageData: ImageData,
  outputImageData: ImageData,
): void {
  const input = imageData.data;
  const output = outputImageData.data;

  for (let y = 0; y < imageData.height; y += 1) {
    for (let x = 0; x < imageData.width; x += 1) {
      const offset = (y * imageData.width + x) * 4;

      const [gray] = input.slice(offset, offset + 4);

      const out = gray > 0.4 * 256 ? 255 : 0;

      output[offset] = out;
      output[offset + 1] = out;
      output[offset + 2] = out;
      output[offset + 3] = 255;
    }
  }
}

export function ditheringRandom(
  imageData: ImageData,
  outputImageData: ImageData,
): void {
  const input = imageData.data;
  const output = outputImageData.data;

  for (let y = 0; y < imageData.height; y += 1) {
    for (let x = 0; x < imageData.width; x += 1) {
      const offset = (y * imageData.width + x) * 4;

      const gray = input[offset];

      const out = gray > (0.4 + 0.7 * (Math.random() - 0.5)) * 256 ? 255 : 0;

      output[offset] = out;
      output[offset + 1] = out;
      output[offset + 2] = out;
      output[offset + 3] = 255;
    }
  }
}
