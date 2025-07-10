import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { History } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  onImageSelect: (dataUri: string) => void;
  currentImage: string | null;
}

export function ImageGallery({ images, onImageSelect, currentImage }: ImageGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-primary" />
          <CardTitle>Recent Documents</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 pb-4">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => onImageSelect(img)}
                className={`relative w-32 h-20 rounded-md overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                  currentImage === img ? 'ring-2 ring-offset-2 ring-primary' : 'ring-1 ring-border'
                }`}
              >
                <Image
                  src={img}
                  alt={`Recent image ${index + 1}`}
                  fill
                  sizes="128px"
                  className="object-cover"
                  data-ai-hint="gallery thumbnail"
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
