'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { analyzeImage, type AnalyzeImageOutput } from '@/ai/flows/analyze-image';
import { generateSearchSuggestions, type GenerateSearchSuggestionsOutput } from '@/ai/flows/generate-search-suggestions';

import { ImageUploader } from '@/components/visual-sage/image-uploader';
import { AnalysisResults } from '@/components/visual-sage/analysis-results';
import { ImageGallery } from '@/components/visual-sage/image-gallery';

export default function Home() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzeImageOutput | null>(null);
  const [suggestions, setSuggestions] = useState<GenerateSearchSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageCache, setImageCache] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAnalysis = useCallback(async (imageUri: string) => {
    setIsLoading(true);
    setAnalysis(null);
    setSuggestions(null);
    setCurrentImage(imageUri);

    if (!imageCache.includes(imageUri)) {
      setImageCache(prev => [imageUri, ...prev.slice(0, 9)]); // Keep last 10 images
    }

    try {
      const [analysisResult, suggestionsResult] = await Promise.all([
        analyzeImage({ photoDataUri: imageUri }),
        generateSearchSuggestions({ photoDataUri: imageUri }),
      ]);
      setAnalysis(analysisResult);
      setSuggestions(suggestionsResult);
    } catch (error) {
      console.error('AI analysis failed:', error);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing the image. Please try again.',
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
              <h2 className="text-xl font-semibold mb-2">Upload an Image</h2>
              <p className="text-muted-foreground mb-6">Let our AI analyze your image and provide insights.</p>
              <ImageUploader onImageUpload={handleAnalysis} disabled={isLoading} />
          </div>
          <ImageGallery images={imageCache} onImageSelect={handleAnalysis} currentImage={currentImage} />
        </div>

        <div className="lg:col-span-3">
          <AnalysisResults 
            image={currentImage}
            analysis={analysis} 
            suggestions={suggestions} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
}
