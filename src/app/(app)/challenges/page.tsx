
"use client";

import { PageHeader } from '@/components/core/PageHeader';
import { ChallengeList } from '@/components/features/challenges/ChallengeList';
import { CHALLENGES_DATA } from '@/lib/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { Challenge, RewardState } from '@/types';
import { Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RewardDisplay } from '@/components/features/rewards/RewardDisplay';

type ChallengeCompletionState = { id: string; completed: boolean };

export default function ChallengesPage() {
  const [challengeCompletionStates, setChallengeCompletionStates] = useLocalStorage<ChallengeCompletionState[]>(
    'mindfulJourneyChallengesCompletion',
    CHALLENGES_DATA.map(c => ({ id: c.id, completed: c.completed }))
  );
  const [rewards, setRewards] = useLocalStorage<RewardState>('mindfulJourneyRewards', { points: 0 });
  const { toast } = useToast();

  const challengesForDisplay: Challenge[] = CHALLENGES_DATA.map(masterChallenge => {
    const completionState = challengeCompletionStates.find(s => s.id === masterChallenge.id);
    return {
      ...masterChallenge,
      completed: completionState ? completionState.completed : masterChallenge.completed,
    };
  });

  const handleToggleChallengeComplete = (challengeId: string) => {
    let newPoints = rewards.points;
    let toastTitle = "";
    let toastDescription = "";

    const challenge = challengesForDisplay.find(c => c.id === challengeId);
    if (!challenge) return;

    const currentCompletionState = challengeCompletionStates.find(s => s.id === challengeId);
    const oldCompletedStatus = currentCompletionState ? currentCompletionState.completed : false;
    const newCompletedStatus = !oldCompletedStatus;

    if (newCompletedStatus) { // Challenge completed just now
      newPoints += challenge.points;
      toastTitle = "Challenge Completed!";
      toastDescription = `You earned ${challenge.points} points.`;
    } else { // Challenge uncompleted just now
      newPoints = Math.max(0, newPoints - challenge.points);
      toastTitle = "Challenge Undone";
      toastDescription = `Points adjusted.`;
    }
    
    setChallengeCompletionStates(prevStates =>
      prevStates.map(s =>
        s.id === challengeId ? { ...s, completed: newCompletedStatus } : s
      )
    );
    
    setRewards({ points: newPoints });
    toast({ title: toastTitle, description: toastDescription });
  };


  return (
    <div className="space-y-10">
      <PageHeader 
        title="Mindfulness Challenges"
        description="Engage in challenges to build healthy habits and earn rewards."
        icon={Trophy}
      />
      <section>
        <RewardDisplay points={rewards.points} />
      </section>
      <section>
        <ChallengeList challenges={challengesForDisplay} onToggleComplete={handleToggleChallengeComplete} />
      </section>
    </div>
  );
}
