import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 flex flex-col items-center">
       <div className="w-full max-w-2xl mb-6 text-left">
        <Button asChild variant="ghost">
          <Link href="/" prefetch={false}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold">Contact Us</CardTitle>
          <CardDescription className="mt-2 text-lg">
            We'd love to hear from you. Fill out the form below to get in touch.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                <User className="inline-block mr-2 h-4 w-4" />
                Full Name
              </Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline-block mr-2 h-4 w-4" />
                Email Address
              </Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                <MessageSquare className="inline-block mr-2 h-4 w-4" />
                Message
              </Label>
              <Textarea id="message" placeholder="Your message..." rows={6} />
            </div>
            <Button type="submit" className="w-full" size="lg">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
