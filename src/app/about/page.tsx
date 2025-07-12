import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, ScanLine } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/" prefetch={false}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold">About ClarifAI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-12">
          <div>
            <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              At ClarifAI, our mission is to bridge the gap between physical documents and the digital world. We believe that valuable information locked in handwritten notes, forms, and archives should be easily accessible. Our advanced AI is designed to accurately transcribe even the most challenging handwriting, making data entry, archiving, and information retrieval effortless and efficient for everyone.
            </p>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-center">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <ScanLine className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Handwriting Recognition</h3>
                <p className="text-muted-foreground">
                  Our core technology uses AI to accurately convert messy handwriting into clean, digital text.
                </p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Complex Document AI</h3>
                <p className="text-muted-foreground">
                  We process complex layouts, tables, and forms, preserving the structure of your original documents.
                </p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
                <p className="text-muted-foreground">
                  Our service is built to be easily integrated into your own applications and workflows.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
