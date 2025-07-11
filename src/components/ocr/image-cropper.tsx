
'use client';
import { useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CropIcon } from 'lucide-react';

interface ImageCropperProps {
  imageToCrop: string;
  onImageCropped: (croppedImage: string | null) => void;
}

function getCroppedImg(
    image: HTMLImageElement,
    crop: PixelCrop,
  ): Promise<string> {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
  
    if (!ctx) {
        throw new Error('No 2d context');
    }

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  
    return new Promise((resolve) => {
      resolve(canvas.toDataURL("image/jpeg"));
    });
}

export function ImageCropper({ imageToCrop, onImageCropped }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        16 / 9,
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  }

  const handleCrop = async () => {
    if (completedCrop && imgRef.current) {
        const croppedImageUrl = await getCroppedImg(imgRef.current, completedCrop);
        onImageCropped(croppedImageUrl);
    } else {
        onImageCropped(imageToCrop); // if no crop is made, use the original image
    }
  };

  return (
    <Dialog open={!!imageToCrop} onOpenChange={(isOpen) => !isOpen && onImageCropped(null)}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="my-4">
            <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
                aspect={16/9}
            >
                <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imageToCrop}
                    onLoad={onImageLoad}
                    className="w-full"
                />
            </ReactCrop>
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={() => onImageCropped(null)}>Cancel</Button>
            <Button onClick={handleCrop}>
                <CropIcon className="mr-2 h-4 w-4" />
                Crop and Process
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
