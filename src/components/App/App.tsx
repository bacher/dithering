import { RefObject, useEffect, useRef } from 'react';

import { ImagePicker } from '../ImagePicker/ImagePicker.tsx';

import styles from './App.module.css';
import {
  threshold,
  grayscale,
  ditheringRandom,
  ProcessingFunction,
} from '../../processing/processing.ts';

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 320;

export function App() {
  const canvasInputRef = useRef<HTMLCanvasElement>(null);
  const canvasGrayscaleRef = useRef<HTMLCanvasElement>(null);
  const canvasThresholdRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringRandomRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringRandomAnimatedRef = useRef<HTMLCanvasElement>(null);

  const grayscaleImageDataRef = useRef<ImageData | undefined>();
  const temporalImageDataRef = useRef<ImageData | undefined>();

  function renderFrame(
    canvasRef: RefObject<HTMLCanvasElement>,
    func: ProcessingFunction,
  ) {
    const ctx = canvasRef.current!.getContext('2d', {
      alpha: false,
    })!;

    func(grayscaleImageDataRef.current!, temporalImageDataRef.current!);

    ctx.putImageData(temporalImageDataRef.current!, 0, 0);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (grayscaleImageDataRef.current) {
        renderFrame(canvasDitheringRandomAnimatedRef, ditheringRandom);
      }
    }, 44);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

          const grayscaleImageData = ctx.createImageData(
            CANVAS_WIDTH,
            CANVAS_HEIGHT,
          );

          grayscale(imageData, grayscaleImageData);
          grayscaleImageDataRef.current = grayscaleImageData;

          ctxGrayscale.putImageData(grayscaleImageData, 0, 0);

          temporalImageDataRef.current = ctx.createImageData(
            CANVAS_WIDTH,
            CANVAS_HEIGHT,
          );

          renderFrame(canvasThresholdRef, threshold);
          renderFrame(canvasDitheringRandomRef, ditheringRandom);
          renderFrame(canvasDitheringRandomAnimatedRef, ditheringRandom);
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
          ref={canvasThresholdRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringRandomRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringRandomAnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
      </div>
    </div>
  );
}
