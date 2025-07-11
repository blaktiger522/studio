
'use client';

import { useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { extractTextFromImage, type ExtractTextFromImageOutput } from '@/ai/flows/extract-text-from-image';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OcrResults } from '@/components/ocr/ocr-results';
import { CameraUploader } from '@/components/ocr/camera-uploader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';

import { Camera, FileUp, Sparkles, ScanText, Search, MessageSquare, FileDigit, HomeIcon, History } from 'lucide-react';
import { ImageCropper } from '@/components/ocr/image-cropper';

const features = [
  {
    icon: Sparkles,
    title: 'Smart Enhancement',
    description: 'Advanced AI technology that improves text clarity and ensures words make sense in context.',
  },
  {
    icon: FileDigit,
    title: 'Number Clarity',
    description: 'Special processing to ensure numbers are accurately transcribed for financial notes and data.',
  },
  {
    icon: Search,
    title: 'Term Search',
    description: 'Easily search for unclear terms, medicine names, or any word you need to verify or learn more about.',
  },
  {
    icon: MessageSquare,
    title: 'Context Suggestions',
    description: 'Get smart word suggestions for unclear text based on sentence context and meaning.',
  },
];

interface TranscriptionHistoryItem {
  id: string;
  image: string;
  text: string;
  timestamp: string;
}

export default function Home() {
  const [ocrResult, setOcrResult] = useState<ExtractTextFromImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imageToCrop, setImageToCrop] = useState<string | undefined>(undefined);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExtraction = useCallback(async (imageUri: string) => {
    setIsLoading(true);
    setOcrResult(null);
    setCurrentImage(imageUri);
    setIsCameraOpen(false); // Close camera dialog after capture

    try {
      const result = await extractTextFromImage({ photoDataUri: imageUri });
      setOcrResult(result);

      // Save to history
      const historyItem: TranscriptionHistoryItem = {
        id: new Date().toISOString(),
        image: imageUri,
        text: result.extractedText,
        timestamp: new Date().toISOString(),
      };

      const storedHistory = localStorage.getItem('transcriptionHistory');
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      history.unshift(historyItem); // Add to the beginning
      localStorage.setItem('transcriptionHistory', JSON.stringify(history.slice(0, 50))); // Limit history to 50 items

    } catch (error) {
      console.error('OCR failed:', error);
      toast({
        title: 'Extraction Failed',
        description: 'There was an error extracting text from the image. Please try again.',
        variant: 'destructive',
      });
      setCurrentImage(null);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const onImageSelected = (imageUri: string) => {
    setImageToCrop(imageUri);
    setIsCameraOpen(false);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelected(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset file input to allow selecting the same file again
    if(event.target) {
      event.target.value = "";
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
       {imageToCrop && (
        <ImageCropper
          imageToCrop={imageToCrop}
          onImageCropped={(croppedImage) => {
            setImageToCrop(undefined);
            if (croppedImage) {
              handleExtraction(croppedImage);
            }
          }}
        />
      )}
      <main className="flex-grow container mx-auto p-4 md:p-6 space-y-8 pb-24">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary">ClarifAI</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            From Blurity To Clarity<br/>Complexity To Simplicity<br/>We Turn Chaos To Gloss Flawlessly
          </p>
        </div>

        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
           <Image 
              src="https://placehold.co/600x240.png"
              alt="Handwritten notes on a board"
              layout="fill"
              objectFit="cover"
              className="brightness-90"
              data-ai-hint="sticky notes"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
            <DialogTrigger asChild>
               <Button size="lg" className="h-14 text-lg w-full">
                  <Camera className="mr-3" />
                  Take Photo
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Capture Image</DialogTitle>
              </DialogHeader>
              <CameraUploader onImageCapture={onImageSelected} disabled={isLoading} />
            </DialogContent>
          </Dialog>
         
          <Button size="lg" variant="outline" className="h-14 text-lg bg-white dark:bg-gray-800 w-full" onClick={triggerFileUpload}>
            <FileUp className="mr-3" />
            Upload Image
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        {currentImage || isLoading ? (
          <OcrResults 
            image={currentImage}
            result={ocrResult} 
            isLoading={isLoading} 
          />
        ) : (
          <>
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-base font-semibold text-gray-800 dark:text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Transcriptions</h2>
              <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-900/50">
                <ScanText className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">No transcriptions yet</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">Capture or upload an image to get started</p>
              </div>
            </div>
          </>
        )}
      </main>

       <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 shadow-t-lg md:hidden">
        <nav className="flex justify-around items-center h-16">
          <Link href="/" className="flex flex-col items-center justify-center gap-1 text-primary">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/history" className="flex flex-col items-center justify-center gap-1 text-gray-400 dark:text-gray-500">
            <History className="w-6 h-6" />
            <span className="text-xs font-medium">History</span>
          </Link>
        </nav>
      </footer>
       <footer className="hidden md:block bg-background border-t">
        <div className="container mx-auto py-6 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} ClarifAI. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/about" className="text-sm hover:underline">About</Link>
            <Link href="/contact" className="text-sm hover:underline">Contact</Link>
            <Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
