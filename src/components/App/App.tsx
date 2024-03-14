import { useRef } from 'react';

import { ImagePicker } from '../ImagePicker/ImagePicker.tsx';

import styles from './App.module.css';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className={styles.root}>
      <ImagePicker
        onImageLoaded={(img) => {
          const ctx = canvasRef.current!.getContext('2d', {
            alpha: false,
          })!;

          ctx.drawImage(img, 0, 0);
        }}
      />
      <canvas ref={canvasRef} width={320} height={320} />
    </div>
  );
}
