'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { extractTextFromImage, type ExtractTextFromImageOutput } from '@/ai/flows/extract-text-from-image';

import { ImageUploader } from '@/components/ocr/image-uploader';
import { OcrResults } from '@/components/ocr/ocr-results';
import { ImageGallery } from '@/components/ocr/image-gallery';

export default function Home() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<ExtractTextFromImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageCache, setImageCache] = useState<string[]>([]);
  const { toast } = useToast();

  const handleExtraction = useCallback(async (imageUri: string) => {
    setIsLoading(true);
    setOcrResult(null);
    setCurrentImage(imageUri);

    if (!imageCache.includes(imageUri)) {
      setImageCache(prev => [imageUri, ...prev.slice(0, 9)]); // Keep last 10 images
    }

    try {
      const result = await extractTextFromImage({ photoDataUri: imageUri });
      setOcrResult(result);
    } catch (error) {
      console.error('OCR failed:', error);
      toast({
        title: 'Extraction Failed',
        description: 'There was an error extracting text from the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, imageCache]);

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 rounded-lg bg-card border">
              <h2 className="text-xl font-semibold mb-2">Upload Document</h2>
              <p className="text-muted-foreground mb-6">Scan handwritten notes, forms, or complex texts and convert them to digital format.</p>
              <ImageUploader onImageUpload={handleExtraction} disabled={isLoading} />
          </div>
          <ImageGallery images={imageCache} onImageSelect={handleExtraction} currentImage={currentImage} />
        </div>

        <div className="lg:col-span-3">
          <OcrResults 
            image={currentImage}
            result={ocrResult} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
}
