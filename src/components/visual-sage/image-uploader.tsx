'use client';

import { useState, type ChangeEvent, type DragEvent } from 'react';
import { UploadCloud, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploaderProps {
  onImageUpload: (dataUri: string) => void;
  disabled?: boolean;
}

export function ImageUploader({ onImageUpload, disabled }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError('File is too large. Please upload an image under 4MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Invalid file type. Please upload an image.');
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files?.[0] ?? null);
    e.target.value = ''; // Reset input to allow re-uploading the same file
  };
  
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileChange(file ?? null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-full p-8 border-2 border-dashed rounded-lg text-center transition-colors duration-300 ${
          dragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <UploadCloud className="w-16 h-16 mx-auto text-muted-foreground" />
        <p className="mt-4 text-lg font-semibold">Drag & drop your image here</p>
        <p className="mt-1 text-sm text-muted-foreground">or</p>
        <Button asChild variant="outline" className="mt-4" disabled={disabled}>
          <label htmlFor="image-upload" className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
            <FileImage className="mr-2 h-4 w-4" />
            Browse Files
            <Input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleInputChange} disabled={disabled} />
          </label>
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">PNG, JPG, GIF, WEBP up to 4MB</p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
