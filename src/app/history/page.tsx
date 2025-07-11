
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, History, HomeIcon, Inbox, Info, Mail } from 'lucide-react';

interface TranscriptionHistoryItem {
  id: string;
  image: string;
  text: string;
  timestamp: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<TranscriptionHistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<TranscriptionHistoryItem | null>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem('transcriptionHistory');
    if (storedHistory) {
      const parsedHistory: TranscriptionHistoryItem[] = JSON.parse(storedHistory);
      // Sort by timestamp descending to show newest first
      parsedHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setHistory(parsedHistory);
    }
  }, []);

  if (selectedItem) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Button variant="ghost" onClick={() => setSelectedItem(null)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Button>
        <div className="mt-4 space-y-6">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <Image
              src={selectedItem.image}
              alt="Transcription source"
              width={800}
              height={600}
              className="object-contain w-full"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Extracted Text</CardTitle>
              <CardDescription>
                Processed on {new Date(selectedItem.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full p-4 text-base bg-secondary/50 font-mono rounded-md border border-input whitespace-pre-wrap break-words">
                {selectedItem.text}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4 md:p-6 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">History</h1>
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {history.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((item) => (
              <Card 
                key={item.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedItem(item)}
              >
                <CardHeader>
                  <div className="relative w-full h-32 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt="Transcription thumbnail"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground truncate">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 mt-10 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-900/50">
            <Inbox className="w-16 h-16 text-gray-400 dark:text-gray-600" />
            <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">No History Found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your processed images will appear here.
            </p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 shadow-t-lg md:hidden">
        <nav className="flex justify-around items-center h-16">
          <Link href="/" className="flex flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-400">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/history" className="flex flex-col items-center justify-center gap-1 text-primary">
            <History className="w-6 h-6" />
            <span className="text-xs font-medium">History</span>
          </Link>
           <Link href="/about" className="flex flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-400">
            <Info className="w-6 h-6" />
            <span className="text-xs font-medium">About</span>
          </Link>
          <Link href="/contact" className="flex flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-400">
            <Mail className="w-6 h-6" />
            <span className="text-xs font-medium">Contact</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
