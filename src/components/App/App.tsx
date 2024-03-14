import { useRef } from 'react';

import { ImagePicker } from '../ImagePicker/ImagePicker.tsx';

import styles from './App.module.css';
import { dithering, grayscale } from '../../processing/processing.ts';

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 320;

export function App() {
  const canvasInputRef = useRef<HTMLCanvasElement>(null);
  const canvasGrayscaleRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className={styles.root}>
      <ImagePicker
        onImageLoaded={(img) => {
          const ctx = canvasInputRef.current!.getContext('2d', {
            alpha: false,
          })!;
          const ctxGrayscale = canvasGrayscaleRef.current!.getContext('2d', {
            alpha: false,
          })!;
          const ctxDithering = canvasDitheringRef.current!.getContext('2d', {
            alpha: false,
          })!;

          const ratio = img.width / img.height;

          const width = CANVAS_WIDTH * Math.max(1, ratio);
          const height = CANVAS_HEIGHT * Math.min(1, ratio);

          ctx.drawImage(
            img,
            (CANVAS_WIDTH - width) / 2,
            (CANVAS_HEIGHT - height) / 2,
            width,
            height,
          );

          const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          const outputImageData = ctx.createImageData(
            CANVAS_WIDTH,
            CANVAS_HEIGHT,
          );

          grayscale(imageData, outputImageData);

          ctxGrayscale.putImageData(outputImageData, 0, 0);

          dithering(outputImageData, outputImageData);

          ctxDithering.putImageData(outputImageData, 0, 0);
        }}
      />
      <div className={styles.frames}>
        <canvas
          ref={canvasInputRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasGrayscaleRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
      </div>
    </div>
  );
}
