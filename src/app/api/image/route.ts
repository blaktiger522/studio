
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
    // Return a placeholder or error image
    const placeholder = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="240" viewBox="0 0 600 240"><rect width="600" height="240" fill="#e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#94a3b8">Error generating image</text></svg>',
      'utf-8'
    );
    return new NextResponse(
      placeholder,
      { 
        status: 500,
        headers: {
            'Content-Type': 'image/svg+xml'
        }
      }
    );
  }
}
