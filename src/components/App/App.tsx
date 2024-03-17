import { RefObject, useEffect, useRef } from 'react';

import { ImagePicker } from '../ImagePicker/ImagePicker.tsx';

import styles from './App.module.css';
import {
  threshold,
  grayscale,
  ditheringRandom,
  ProcessingFunction,
  ditheringTimed,
  ditheringTimed2,
  ditheringTimed3,
  ditheringTimed4,
  ditheringTimed5,
} from '../../processing/processing.ts';

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 320;

export function App() {
  const canvasInputRef = useRef<HTMLCanvasElement>(null);
  const canvasGrayscaleRef = useRef<HTMLCanvasElement>(null);
  const canvasThresholdRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringRandomRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringRandomAnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimedAnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimed2AnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimed3AnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimed4AnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimed5AnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimed6AnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimed7AnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimed8AnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimed9AnimatedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitheringTimedTmpAnimatedRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    let requestAnimationFrameId: number;

    const runs = [
      {
        canvas: canvasDitheringTimedAnimatedRef.current!,
        logic: ditheringTimed,
      },
      {
        canvas: canvasDitheringTimed2AnimatedRef.current!,
        logic: ditheringTimed2,
      },
      {
        canvas: canvasDitheringTimed3AnimatedRef.current!,
        logic: ditheringTimed3,
      },
      {
        canvas: canvasDitheringTimed4AnimatedRef.current!,
        logic: ditheringTimed4,
      },
      {
        canvas: canvasDitheringTimed5AnimatedRef.current!,
        logic: ditheringTimed5(11),
      },
      {
        canvas: canvasDitheringTimed6AnimatedRef.current!,
        logic: ditheringTimed5(46),
      },
      {
        canvas: canvasDitheringTimed7AnimatedRef.current!,
        logic: ditheringTimed5(1021),
      },
      {
        canvas: canvasDitheringTimed8AnimatedRef.current!,
        logic: ditheringTimed5(46, 60),
      },
      {
        canvas: canvasDitheringTimed9AnimatedRef.current!,
        logic: ditheringTimed5(46, 30),
      },
      {
        canvas: canvasDitheringTimedTmpAnimatedRef.current!,
        logic: ditheringTimed5(undefined),
      },
    ];

    function render() {
      const now = performance.now();

      if (grayscaleImageDataRef.current && temporalImageDataRef.current) {
        for (const { canvas, logic } of runs) {
          const ctx = canvas.getContext('2d', {
            alpha: false,
          })!;

          logic(
            grayscaleImageDataRef.current,
            temporalImageDataRef.current,
            now,
          );

          ctx.putImageData(temporalImageDataRef.current, 0, 0);
        }
      }

      requestAnimationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
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
        <canvas
          ref={canvasDitheringTimedAnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringTimed2AnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringTimed3AnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringTimed4AnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringTimed5AnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringTimed6AnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringTimed7AnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringTimed8AnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <canvas
          ref={canvasDitheringTimed9AnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <div className={styles.splitter} />
        <canvas
          ref={canvasDitheringTimedTmpAnimatedRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
      </div>
    </div>
  );
}
