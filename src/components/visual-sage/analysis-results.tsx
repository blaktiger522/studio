import type { AnalyzeImageOutput } from '@/ai/flows/analyze-image';
import type { GenerateSearchSuggestionsOutput } from '@/ai/flows/generate-search-suggestions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Search, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface AnalysisResultsProps {
  image: string | null;
  analysis: AnalyzeImageOutput | null;
  suggestions: GenerateSearchSuggestionsOutput | null;
  isLoading: boolean;
}

export function AnalysisResults({ image, analysis, suggestions, isLoading }: AnalysisResultsProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      );
    }

    if (!image) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full p-8 border-2 border-dashed rounded-lg border-border">
          <ImageIcon className="w-16 h-16 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Your analysis will appear here</h3>
          <p className="mt-2 text-muted-foreground">Upload an image to get started</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {analysis && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-accent" />
                <CardTitle>Image Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base">{analysis.summary}</p>
            </CardContent>
          </Card>
        )}

        {suggestions && suggestions.suggestions.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Search className="w-6 h-6 text-accent" />
                <CardTitle>Search Suggestions</CardTitle>
              </div>
              <CardDescription>
                Use these suggestions to find similar images or learn more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {suggestions.suggestions.map((suggestion, index) => (
                  <Badge key={index} variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-accent/20 transition-colors">
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {image && (
        <div className="mb-6 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={image}
            alt="Uploaded for analysis"
            width={600}
            height={400}
            className="object-cover w-full aspect-video"
            data-ai-hint="analysis image"
          />
        </div>
      )}
      {renderContent()}
    </div>
  );
}
