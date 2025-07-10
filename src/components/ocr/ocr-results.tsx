import type { ExtractTextFromImageOutput } from '@/ai/flows/extract-text-from-image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardCopy, FileText, ScanSearch, Type } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';

interface OcrResultsProps {
  image: string | null;
  result: ExtractTextFromImageOutput | null;
  isLoading: boolean;
}

export function OcrResults({ image, result, isLoading }: OcrResultsProps) {
  const { toast } = useToast();

  const handleCopyToClipboard = () => {
    if (result?.extractedText) {
      navigator.clipboard.writeText(result.extractedText);
      toast({
        title: 'Copied to Clipboard',
        description: 'The extracted text has been copied.',
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-5 w-full mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-40" />
          </CardContent>
        </Card>
      );
    }

    if (!image) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full p-8 border-2 border-dashed rounded-lg border-border">
          <ScanSearch className="w-16 h-16 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Your results will appear here</h3>
          <p className="mt-2 text-muted-foreground">Upload an image to start extracting text</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {result && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Type className="w-6 h-6 text-primary" />
                  <CardTitle>Extracted Text</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                  <ClipboardCopy className="mr-2" />
                  Copy
                </Button>
              </div>
              <CardDescription>
                Review the extracted text below. You can edit it directly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="w-full h-80 text-base font-mono bg-background"
                defaultValue={result.extractedText}
                aria-label="Extracted Text"
              />
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {image && !isLoading && (
        <div className="mb-6 overflow-hidden rounded-lg shadow-lg relative group">
          <Image
            src={image}
            alt="Uploaded for OCR"
            width={600}
            height={400}
            className="object-cover w-full aspect-video"
            data-ai-hint="document scan"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className='flex items-center gap-2 text-white font-semibold'>
              <FileText />
              <span>Original Image</span>
            </div>
          </div>
        </div>
      )}
       {image && isLoading && (
        <div className="mb-6 overflow-hidden rounded-lg">
           <Skeleton className="w-full aspect-video" />
        </div>
      )}
      {renderContent()}
    </div>
  );
}
