import { useEffect, useRef } from 'react';

type ImagePickerProps = {
  onImageLoaded: (image: HTMLImageElement) => void;
};

export function ImagePicker({ onImageLoaded }: ImagePickerProps) {
  const initialRef = useRef(true);

  function triggerToImage(dataUrl: string) {
    const img = new Image();
    img.addEventListener('load', () => {
      onImageLoaded(img);
    });
    img.src = dataUrl;
  }

  useEffect(() => {
    if (!initialRef.current) {
      return;
    }
    initialRef.current = false;

    const imageDataUrl = localStorage.getItem('dithering:saved_image');

    if (imageDataUrl) {
      triggerToImage(imageDataUrl);
    }
  }, []);

  return (
    <label>
      Select a picture:{' '}
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const imageDataUrl = reader.result as string;
              localStorage.setItem('dithering:saved_image', imageDataUrl);

              triggerToImage(imageDataUrl);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </label>
  );
}
