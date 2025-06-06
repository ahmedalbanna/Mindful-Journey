"use client";

import { PageHeader } from '@/components/core/PageHeader';
import { ChallengeList } from '@/components/features/challenges/ChallengeList';
import { CHALLENGES_DATA } from '@/lib/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { Challenge, RewardState } from '@/types';
import { Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RewardDisplay } from '@/components/features/rewards/RewardDisplay'; // Added import

export default function ChallengesPage() {
  const [challenges, setChallenges] = useLocalStorage<Challenge[]>('mindfulJourneyChallenges', CHALLENGES_DATA);
  const [rewards, setRewards] = useLocalStorage<RewardState>('mindfulJourneyRewards', { points: 0 });
  const { toast } = useToast();

  const handleToggleChallengeComplete = (challengeId: string) => {
    const challengeIndex = challenges.findIndex(c => c.id === challengeId);
    if (challengeIndex === -1) return;

    const oldChallengeState = challenges[challengeIndex].completed;
    const updatedChallenges = challenges.map(c =>
      c.id === challengeId ? { ...c, completed: !c.completed } : c
    );
    setChallenges(updatedChallenges);

    const challenge = updatedChallenges[challengeIndex];
    if (challenge.completed && !oldChallengeState) { // Completed just now
      setRewards(prevRewards => ({ points: prevRewards.points + challenge.points }));
      toast({ title: "Challenge Completed!", description: `You earned ${challenge.points} points.` });
    } else if (!challenge.completed && oldChallengeState) { // Uncompleted just now
      setRewards(prevRewards => ({ points: Math.max(0, prevRewards.points - challenge.points) }));
      toast({ title: "Challenge Undone", description: `Points adjusted.` });
    }
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
        <ChallengeList challenges={challenges} onToggleComplete={handleToggleChallengeComplete} />
      </section>
    </div>
  );
}
