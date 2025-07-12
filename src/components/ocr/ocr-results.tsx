import { useState, useEffect } from 'react';
import type { ExtractTextFromImageOutput } from '@/ai/flows/extract-text-from-image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardCopy, FileText, Type, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


interface OcrResultsProps {
  image: string | null;
  result: ExtractTextFromImageOutput | null;
  isLoading: boolean;
}

export function OcrResults({ image, result, isLoading }: OcrResultsProps) {
  const { toast } = useToast();
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    if (result?.extractedText) {
      setEditedText(result.extractedText);
    }
  }, [result]);

  const handleCopyToClipboard = () => {
    if (editedText) {
      navigator.clipboard.writeText(editedText);
      toast({
        title: 'Copied to Clipboard',
        description: 'The extracted text has been copied.',
      });
    }
  };

  const handleSuggestionSelect = (original: string, suggestion: string) => {
    // A simple regex to replace the word, might need improvement for more complex cases
    const regex = new RegExp(`\\b${original}\\b`, 'gi');
    setEditedText(currentText => currentText.replace(regex, suggestion));
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

            {result.contextualSummary && (
                <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Context Analysis</AlertTitle>
                    <AlertDescription>
                        {result.contextualSummary}
                    </AlertDescription>
                </Alert>
            )}

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
                  className="text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
                  aria-label="Extracted Text"
                >
                  {editedText}
                </p>
              </CardContent>
            </Card>

            {result.clarifications && result.clarifications.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Interactive Clarifications</h2>
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            {result.clarifications.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-3 bg-secondary/30 rounded-lg">
                                    <div className="md:col-span-1">
                                      <p className="font-semibold text-destructive line-through">{item.originalWord}</p>
                                      <p className="text-xs text-muted-foreground">{item.reasoning}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <Select onValueChange={(value) => handleSuggestionSelect(item.originalWord, value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a correction..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {item.suggestions.map((suggestion, sIndex) => (
                                                    <SelectItem key={sIndex} value={suggestion}>
                                                        {suggestion}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            )}
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
