import type {Metadata} from 'next';
import Link from 'next/link';
import { ScanText } from 'lucide-react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'ClarifAI',
  description: 'From Blurity To Clarity, Complexity To Simplicity. We Turn Chaos To Gloss Flawlessly',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <header className="p-4 md:p-6 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between gap-3">
              <Link href="/" className="flex items-center gap-3">
                <ScanText className="h-8 w-8 text-primary" />
                <h1 className="text-2xl md:text-3xl font-bold font-headline">ClarifAI</h1>
              </Link>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="mt-12 p-6 border-t bg-card/50">
            <div className="container mx-auto text-center text-muted-foreground text-sm">
              <div className="flex justify-center gap-4 mb-4">
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </div>
              <p>&copy; {new Date().getFullYear()} ClarifAI. All rights reserved.</p>
              <p className="mt-1">Powered by GenAI</p>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
