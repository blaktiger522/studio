
import { generateImage } from '@/ai/flows/generate-image-flow';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const imageDataUri = await generateImage({
      prompt: 'A professional, high-resolution photo of a handwritten document on a clean desk. The style should be modern, minimalist, and suitable for a tech website banner. No people should be visible.',
    });

    if (!imageDataUri.startsWith('data:image/')) {
        throw new Error('Invalid image data returned from AI.');
    }

    const mimeType = imageDataUri.substring(imageDataUri.indexOf(':') + 1, imageDataUri.indexOf(';'));
    const base64Data = imageDataUri.substring(imageDataUri.indexOf(',') + 1);
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Failed to generate image:', error);
    return new NextResponse(
      'Error generating image. Please try again later.',
      { status: 500 }
    );
  }
}
