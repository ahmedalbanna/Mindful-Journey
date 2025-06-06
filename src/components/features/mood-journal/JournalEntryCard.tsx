"use client";

import type { JournalEntry } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const moodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800/30 dark:text-green-300 dark:border-green-700';
      case 'calm': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800/30 dark:text-blue-300 dark:border-blue-700';
      case 'neutral': return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-600';
      case 'sad': return 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-800/30 dark:text-indigo-300 dark:border-indigo-700';
      case 'anxious': return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800/30 dark:text-yellow-300 dark:border-yellow-700';
      default: return 'bg-secondary text-secondary-foreground border-border';
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-headline text-lg">{format(parseISO(entry.date), "MMMM d, yyyy")}</CardTitle>
          <Badge variant="outline" className={`capitalize ${moodColor(entry.mood)}`}>{entry.mood}</Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Logged on {format(parseISO(entry.date), "EEEE, h:mm a")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap line-clamp-4">{entry.notes}</p>
      </CardContent>
      <CardFooter className="pt-3 border-t">
        <div className="flex items-center text-muted-foreground">
          <span className="mr-1">Rating:</span>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < entry.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
           <span className="ml-1">({entry.rating}/5)</span>
        </div>
      </CardFooter>
    </Card>
  );
}
