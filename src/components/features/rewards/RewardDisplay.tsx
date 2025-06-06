"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';

interface RewardDisplayProps {
  points: number;
}

export function RewardDisplay({ points }: RewardDisplayProps) {
  return (
    <Card className="shadow-lg bg-gradient-to-br from-primary/80 to-accent/80 dark:from-primary/60 dark:to-accent/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-headline font-medium text-primary-foreground">Reward Points</CardTitle>
        <Coins className="h-6 w-6 text-primary-foreground/80" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-primary-foreground">{points}</div>
        <p className="text-xs text-primary-foreground/90 pt-1">Keep up the mindful work!</p>
      </CardContent>
    </Card>
  );
}
