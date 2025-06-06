"use client";

import type { Challenge } from '@/types';
import { ChallengeCard } from './ChallengeCard';

interface ChallengeListProps {
  challenges: Challenge[];
  onToggleComplete: (challengeId: string) => void;
}

export function ChallengeList({ challenges, onToggleComplete }: ChallengeListProps) {
  if (challenges.length === 0) {
    return <p className="text-muted-foreground">No challenges available at the moment.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
}
