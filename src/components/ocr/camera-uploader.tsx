'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Camera, Video, VideoOff, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '../ui/card';

interface CameraUploaderProps {
  onImageCapture: (dataUri: string) => void;
  disabled?: boolean;
}

export function CameraUploader({ onImageCapture, disabled }: CameraUploaderProps) {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraOn(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, []);

  const startCamera = useCallback(async () => {
    stopCamera(); 
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      setHasCameraPermission(true);
      setIsCameraOn(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      setIsCameraOn(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings.',
      });
    }
  }, [toast, stopCamera]);

  useEffect(() => {
    // Check for camera support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
    }
    
    // Clean up camera stream when component unmounts or is disabled
    return () => {
      stopCamera();
    };
  }, [stopCamera, disabled]);
  
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        onImageCapture(dataUri);
        stopCamera();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Card className="w-full p-4 border-2 border-dashed relative overflow-hidden aspect-video flex items-center justify-center bg-muted/50">
        <video ref={videoRef} className={`w-full h-full object-cover ${isCameraOn ? 'block' : 'hidden'}`} autoPlay playsInline muted />
        <canvas ref={canvasRef} className="hidden" />
        
        {!isCameraOn && (
           <div className="text-center text-muted-foreground">
             <VideoOff className="w-16 h-16 mx-auto" />
             <p className="mt-2">Camera is off</p>
           </div>
        )}

      </Card>
      
      {hasCameraPermission === false && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Camera Error</AlertTitle>
          <AlertDescription>
            Camera access is required. Please grant permission or check if your device has a camera.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4">
        {!isCameraOn ? (
           <Button onClick={startCamera} disabled={disabled || hasCameraPermission === false}>
            <Video className="mr-2" /> Start Camera
          </Button>
        ) : (
          <>
            <Button onClick={handleCapture} disabled={disabled}>
              <Camera className="mr-2" /> Capture Image
            </Button>
            <Button onClick={stopCamera} variant="outline">
              <VideoOff className="mr-2" /> Stop Camera
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
