"use client";

import Image from 'next/image';
import type { GuidedSession } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, PlayCircle } from 'lucide-react';

interface GuidedSessionCardProps {
  session: GuidedSession;
  onPlay?: (session: GuidedSession) => void;
}

export function GuidedSessionCard({ session, onPlay }: GuidedSessionCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {session.image && (
        <div className="relative h-48 w-full">
          <Image 
            src={session.image} 
            alt={session.title} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={`${session.type} practice`}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <session.icon className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-xl">{session.title}</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground capitalize">{session.type}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground text-base leading-relaxed">{session.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{session.duration} min</span>
        </div>
        <Button variant="default" size="sm" onClick={() => onPlay?.(session)}>
          <PlayCircle className="h-5 w-5 mr-2" />
          Start Session
        </Button>
      </CardFooter>
    </Card>
  );
}
