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
  /* 10 */ [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
      const sampleIndex = Math.round(interpolation * 10);

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

const paletteDynamic = [
  /* 00 */ [0],
  /* 01 */ [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  /* 02 */ [0, 1, 0, 0, 0],
  /* 03 */ [0, 1, 0],
  /* 04 */ [0, 1, 0, 1, 0],
  /* 05 */ [0, 1],
  /* 06 */ [1, 0, 1, 1, 0],
  /* 07 */ [1, 1, 0],
  /* 08 */ [1, 1, 1, 0, 1],
  /* 09 */ [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  /* 10 */ [1],
];

export const ditheringTimed6 =
  (hertz = 120) =>
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

        const paletteIndex = Math.min(9, Math.floor(value * 10));
        const group = paletteDynamic[paletteIndex];

        const sampleIndex = Math.round(interpolation * group.length);

        const out = group[sampleIndex] * 255;

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };

const paletteDynamic2 = [
  /* 00 */ [0],
  /* 01 */ [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  /* 02 */ [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  /* 03 */ [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  /* 04 */ [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  /* 05 */ [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  /* 06 */ [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  /* 07 */ [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  /* 08 */ [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  /* 09 */ [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  /* 10 */ [1],
];

export const ditheringTimed7 =
  (hertz = 120) =>
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

        const paletteIndex = Math.min(9, Math.floor(value * 10));
        const group = paletteDynamic2[paletteIndex];

        const sampleIndex = Math.round(interpolation * group.length);

        const out = group[sampleIndex] * 255;

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };

const levels = [
  10,
  10 + 9,
  10 + 9 + 8,
  10 + 9 + 8 + 7,
  10 + 9 + 8 + 7 + 6,
  10 + 9 + 8 + 7 + 6 + 5,
  10 + 9 + 8 + 7 + 6 + 5 + 4,
  10 + 9 + 8 + 7 + 6 + 5 + 4 + 3,
  10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2,
  10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1,
];

const fullRound = levels[levels.length - 1];

export const ditheringTimed8 =
  (hertz = 120) =>
  (
    imageData: ImageData,
    outputImageData: ImageData,
    timeTick: number,
  ): void => {
    const input = imageData.data;
    const output = outputImageData.data;

    const step = (timeTick / (1000 / hertz)) % fullRound;

    let activeIndex = 0;

    for (let i = 0; i < levels.length; i += 1) {
      if (step < levels[i]) {
        activeIndex = i;
        break;
      }
    }

    const activeRange = {
      start: (activeIndex - 0.5) / levels.length,
      end: (activeIndex + 1 + 0.5) / levels.length,
    };

    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const index = y * imageData.width + x;
        const offset = index * 4;

        const gray = input[offset] * 1.1;
        const value = Math.min(1, gray / 256);

        let out = 0;

        if (value >= activeRange.start && value < activeRange.end) {
          out = 255;
        }

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };

export const ditheringTimed9 =
  (hertz = 120) =>
  (
    imageData: ImageData,
    outputImageData: ImageData,
    timeTick: number,
  ): void => {
    const input = imageData.data;
    const output = outputImageData.data;

    const step = (timeTick / (1000 / hertz)) % fullRound;

    let activeIndex = 0;

    for (let i = 0; i < levels.length; i += 1) {
      if (step < levels[i]) {
        activeIndex = i;
        break;
      }
    }

    const invertedActiveIndex = levels.length - activeIndex;

    const activeRange = {
      start: (invertedActiveIndex - 0.5) / levels.length,
      end: (invertedActiveIndex + 1 + 0.5) / levels.length,
    };

    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const index = y * imageData.width + x;
        const offset = index * 4;

        const gray = input[offset] * 1.1;
        const value = Math.min(1, gray / 256);

        let out = 0;

        if (value >= activeRange.start && value < activeRange.end) {
          out = 255;
        }

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };

const levelsCycled = [
  8,
  10 + 9,
  10 + 9 + 8,
  10 + 9 + 8 + 7,
  10 + 9 + 8 + 7 + 6,
  10 + 9 + 8 + 7 + 6 + 5,
  10 + 9 + 8 + 7 + 6 + 5 + 4,
  10 + 9 + 8 + 7 + 6 + 5 + 4 + 3,
  10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2,
  10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 2,
];

export const ditheringTimed10 =
  (hertz = 120) =>
  (
    imageData: ImageData,
    outputImageData: ImageData,
    timeTick: number,
  ): void => {
    const input = imageData.data;
    const output = outputImageData.data;

    let step = (timeTick / (1000 / hertz)) % (fullRound * 2);

    if (step > fullRound) {
      step = 2 * fullRound - step;
    }

    let activeIndex = 0;

    for (let i = 0; i < levelsCycled.length; i += 1) {
      if (step < levelsCycled[i]) {
        activeIndex = i;
        break;
      }
    }

    const activeRange = {
      start: (activeIndex - 0.5) / levelsCycled.length,
      end: (activeIndex + 1 + 0.5) / levelsCycled.length,
    };

    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const index = y * imageData.width + x;
        const offset = index * 4;

        const gray = input[offset] * 1.1;
        const value = Math.min(1, gray / 256);

        let out = 0;

        if (value >= activeRange.start && value < activeRange.end) {
          out = 255;
        }

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };

export const ditheringTimed11 =
  (hertz = 120) =>
  (
    imageData: ImageData,
    outputImageData: ImageData,
    timeTick: number,
  ): void => {
    const input = imageData.data;
    const output = outputImageData.data;

    let step = (timeTick / (1000 / hertz)) % (fullRound * 2);

    if (step > fullRound) {
      step = 2 * fullRound - step;
    }

    let activeIndex = 0;

    for (let i = 0; i < levelsCycled.length; i += 1) {
      if (step < levelsCycled[i]) {
        activeIndex = i;
        break;
      }
    }

    const invertedActiveIndex = levelsCycled.length - activeIndex;

    const activeRange = {
      start: (invertedActiveIndex - 0.5) / levelsCycled.length,
      end: (invertedActiveIndex + 1 + 0.5) / levelsCycled.length,
    };

    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const index = y * imageData.width + x;
        const offset = index * 4;

        const gray = input[offset] * 1.1;
        const value = Math.min(1, gray / 256);

        let out = 0;

        if (value >= activeRange.start && value < activeRange.end) {
          out = 255;
        }

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };
