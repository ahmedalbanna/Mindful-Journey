"use client";

import type { Challenge } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Sparkles } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  onToggleComplete: (challengeId: string) => void;
}

export function ChallengeCard({ challenge, onToggleComplete }: ChallengeCardProps) {
  return (
    <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${challenge.completed ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' : ''}`}>
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <challenge.icon className={`h-6 w-6 ${challenge.completed ? 'text-green-500' : 'text-primary'}`} />
          <CardTitle className="font-headline text-xl">{challenge.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground text-base leading-relaxed">{challenge.description}</p>
        <div className="mt-2 flex items-center text-muted-foreground">
          <Sparkles className="h-4 w-4 mr-1 text-accent" />
          <span>{challenge.points} Points</span>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button 
          variant={challenge.completed ? "outline" : "default"} 
          size="sm" 
          onClick={() => onToggleComplete(challenge.id)}
          className="w-full"
        >
          {challenge.completed ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Mark as Incomplete
            </>
          ) : (
            <>
              <Circle className="h-5 w-5 mr-2" />
              Mark as Complete
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
