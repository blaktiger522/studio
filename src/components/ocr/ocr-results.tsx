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
        <div className="space-y-6">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      );
    }

    if (!image) {
      return null;
    }

    return (
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        <div className="overflow-hidden rounded-lg border shadow-sm">
          <Image
            src={image}
            alt="Uploaded for OCR"
            width={800}
            height={600}
            className="object-contain w-full"
            data-ai-hint="document scan"
          />
        </div>
        
        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Transcription</h2>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                <ClipboardCopy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <p
                  className="text-base text-gray-700 dark:text-gray-300 leading-relaxed"
                  aria-label="Extracted Text"
                >
                  {result.extractedText}
                </p>
              </CardContent>
            </Card>
          </div>
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
