type Pattern = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
];

const patterns: Pattern[] = [
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [0, 0, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [1, 0, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
];

export const ditheringPattern =
  () => (imageData: ImageData, outputImageData: ImageData) => {
    const input = imageData.data;
    const output = outputImageData.data;

    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const index = y * imageData.width + x;
        const offset = index * 4;

        const gray = input[offset] * 1.1;
        const value = Math.min(1, gray / 256);

        const patternIndex = Math.round(value * (patterns.length - 1));

        const pattern = patterns[patternIndex];

        const out = pattern[y % 3][x % 3] * 255;

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };

const patterns2: Pattern[] = [
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, 1, 0],
    [1, 0, 1],
  ],
  [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
  ],
  [
    [1, 0, 1],
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 1, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
];

export const ditheringPattern2 =
  () => (imageData: ImageData, outputImageData: ImageData) => {
    const input = imageData.data;
    const output = outputImageData.data;

    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const index = y * imageData.width + x;
        const offset = index * 4;

        const gray = input[offset] * 1.1;
        const value = Math.min(1, gray / 256);

        const patternIndex = Math.round(value * (patterns2.length - 1));

        const pattern = patterns2[patternIndex];

        const out = pattern[y % 3][x % 3] * 255;

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };

function rotatePattern(i: Pattern): Pattern {
  return [
    [i[2][0], i[1][0], i[0][0]],
    [i[2][1], i[1][1], i[0][1]],
    [i[2][2], i[1][2], i[0][2]],
  ];
}

export const ditheringPattern2Animated =
  (hertz = 120) =>
  (imageData: ImageData, outputImageData: ImageData, timeTick: number) => {
    const input = imageData.data;
    const output = outputImageData.data;
    const step = Math.round(timeTick / (1000 / hertz));

    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const index = y * imageData.width + x;
        const offset = index * 4;

        const gray = input[offset] * 1.1;
        const value = Math.min(1, gray / 256);

        const patternIndex = Math.round(value * (patterns2.length - 1));

        let pattern = patterns2[patternIndex];

        const count = step % 4;
        for (let i = 0; i < count; i += 1) {
          pattern = rotatePattern(pattern);
        }

        const out = pattern[y % 3][x % 3] * 255;

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };

export const ditheringPattern2Animated2 =
  (hertz = 120) =>
  (imageData: ImageData, outputImageData: ImageData, timeTick: number) => {
    const input = imageData.data;
    const output = outputImageData.data;
    const step = Math.round(timeTick / (1000 / hertz));

    for (let y = 0; y < imageData.height; y += 1) {
      for (let x = 0; x < imageData.width; x += 1) {
        const index = y * imageData.width + x;
        const offset = index * 4;

        const gray = input[offset] * 1.1;
        const value = Math.min(1, gray / 256);

        const patternIndex = Math.round(value * (patterns2.length - 1));

        const pattern = patterns2[patternIndex];

        const cycledStep = step % 5;
        const xOffset = Math.floor((cycledStep + 1) / 2);
        const yOffset = Math.floor(cycledStep / 2);

        const out = pattern[(y + yOffset) % 3][(x + xOffset) % 3] * 255;

        output[offset] = out;
        output[offset + 1] = out;
        output[offset + 2] = out;
        output[offset + 3] = 255;
      }
    }
  };
