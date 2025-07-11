import type { ExtractTextFromImageOutput } from '@/ai/flows/extract-text-from-image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardCopy, FileText, Type } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

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
             <Skeleton className="w-full aspect-video" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-40" />
          </CardContent>
        </Card>
      );
    }

    if (!image) {
      return null;
    }

    return (
      <div className="space-y-6 animate-in fade-in-50 duration-500">
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
                Review the extracted text below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="w-full min-h-[10rem] p-4 text-base bg-secondary/50 font-mono rounded-md border border-input whitespace-pre-wrap break-words"
                aria-label="Extracted Text"
              >
                {result.extractedText}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
}
