import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold">About VisualSage</CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">
            Unveiling the stories behind your images.
          </p>
        </CardHeader>
        <CardContent className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                At VisualSage, our mission is to empower everyone to understand and interact with the visual world in a more meaningful way. We believe that every image has a story to tell, and our advanced AI is designed to unlock that narrative. By providing insightful analysis and intuitive search tools, we aim to make visual information more accessible, understandable, and useful for all.
              </p>
            </div>
            <div className="flex justify-center">
              <Image 
                src="https://placehold.co/500x300.png"
                width={500}
                height={300}
                alt="Our Mission"
                className="rounded-lg shadow-md"
                data-ai-hint="team mission"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-center">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Image Analysis</h3>
                <p className="text-muted-foreground">
                  Our core technology analyzes images to provide detailed summaries and identify key elements.
                </p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Visual Search</h3>
                <p className="text-muted-foreground">
                  We generate intelligent search suggestions to help you explore and discover related visual content.
                </p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility Focus</h3>
                <p className="text-muted-foreground">
                  We are committed to making visual content more accessible for users with visual impairments.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
