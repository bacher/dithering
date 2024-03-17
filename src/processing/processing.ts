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

export function ditheringTimed(
  imageData: ImageData,
  outputImageData: ImageData,
  timeTick: number,
): void {
  const input = imageData.data;
  const output = outputImageData.data;

  const interpolation = ((timeTick / 10) % 30) / 30;

  // console.log('interpolation', interpolation);

  for (let y = 0; y < imageData.height; y += 1) {
    for (let x = 0; x < imageData.width; x += 1) {
      const offset = (y * imageData.width + x) * 4;

      const gray = input[offset];

      const out = gray * 1.4 > interpolation * 256 ? 255 : 0;

      output[offset] = out;
      output[offset + 1] = out;
      output[offset + 2] = out;
      output[offset + 3] = 255;
    }
  }
}

const randomList128 = Array.from({ length: 128 }).map(() => Math.random());
const randomList1024 = Array.from({ length: 1024 }).map(() => Math.random());

export function ditheringTimed2(
  imageData: ImageData,
  outputImageData: ImageData,
  timeTick: number,
): void {
  const input = imageData.data;
  const output = outputImageData.data;

  const interpolation = ((timeTick / 10) % 30) / 30;

  for (let y = 0; y < imageData.height; y += 1) {
    for (let x = 0; x < imageData.width; x += 1) {
      const index = y * imageData.width + x;
      const offset = index * 4;

      const stableRnd = randomList128[index % randomList128.length];

      const gray = input[offset];

      const cellInterpolation = (interpolation + stableRnd) % 1;

      const out = gray * 1.4 > cellInterpolation * 256 ? 255 : 0;

      output[offset] = out;
      output[offset + 1] = out;
      output[offset + 2] = out;
      output[offset + 3] = 255;
    }
  }
}

export function ditheringTimed3(
  imageData: ImageData,
  outputImageData: ImageData,
  timeTick: number,
): void {
  const input = imageData.data;
  const output = outputImageData.data;

  const interpolation = ((timeTick / 20) % 30) / 30;

  for (let y = 0; y < imageData.height; y += 1) {
    for (let x = 0; x < imageData.width; x += 1) {
      const index = y * imageData.width + x;
      const offset = index * 4;

      const stableRnd = randomList1024[index % 3];

      const gray = input[offset];

      const cellInterpolation = (interpolation + stableRnd) % 1;

      const out = gray * 1.4 > cellInterpolation * 256 ? 255 : 0;

      output[offset] = out;
      output[offset + 1] = out;
      output[offset + 2] = out;
      output[offset + 3] = 255;
    }
  }
}

const palette = [
  /* 00 */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  /* 01 */ [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  /* 02 */ [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  /* 03 */ [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  /* 04 */ [1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
  /* 05 */ [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  /* 06 */ [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  /* 07 */ [1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
  /* 08 */ [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  /* 09 */ [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
];

const hz120 = 1000 / 120;

export function ditheringTimed4(
  imageData: ImageData,
  outputImageData: ImageData,
  timeTick: number,
): void {
  const input = imageData.data;
  const output = outputImageData.data;

  const interpolation = ((timeTick / hz120) % 30) / 30;

  for (let y = 0; y < imageData.height; y += 1) {
    for (let x = 0; x < imageData.width; x += 1) {
      const index = y * imageData.width + x;
      const offset = index * 4;

      const gray = input[offset] * 1.1;
      const value = Math.min(1, gray / 256);

      const paletteIndex = Math.min(9, Math.floor(value * 10));
      const sampleIndex = Math.floor(interpolation * 10);

      const out = palette[paletteIndex][sampleIndex] * 255;

      output[offset] = out;
      output[offset + 1] = out;
      output[offset + 2] = out;
      output[offset + 3] = 255;
    }
  }
}

export const ditheringTimed5 =
  (randomTrim: number | undefined, hertz = 120) =>
  (
    imageData: ImageData,
    outputImageData: ImageData,
    timeTick: number,
  ): void => {
    const input = imageData.data;
    const output = outputImageData.data;

    const interpolation = ((timeTick / (1000 / hertz)) % 30) / 30;

    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const index = y * imageData.width + x;
        const offset = index * 4;

        const gray = input[offset] * 1.1;
        const value = Math.min(1, gray / 256);

        let currentRandomTrip: number;

        if (randomTrim === undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
          currentRandomTrip = ((window as any).randomTrim ?? 11) as number;
        } else {
          currentRandomTrip = randomTrim;
        }

        const stableRnd = randomList1024[index % currentRandomTrip];
        const cellInterpolation = (interpolation + stableRnd) % 1;

        const paletteIndex = Math.min(9, Math.floor(value * 10));
        const sampleIndex = Math.floor(cellInterpolation * 10);

        const out = palette[paletteIndex][sampleIndex] * 255;

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };
