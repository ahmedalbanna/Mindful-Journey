"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/core/PageHeader';
import { SectionTitle } from '@/components/core/SectionTitle';
import { GuidedSessionList } from '@/components/features/guided-sessions/GuidedSessionList';
import { ChallengeList } from '@/components/features/challenges/ChallengeList';
import { RewardDisplay } from '@/components/features/rewards/RewardDisplay';
import { GUIDED_SESSIONS_DATA, CHALLENGES_DATA } from '@/lib/constants';
import type { Challenge, GuidedSession, RewardState } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LayoutDashboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const [guidedSessions, setGuidedSessions] = useState<GuidedSession[]>([]);
  const [challenges, setChallenges] = useLocalStorage<Challenge[]>('mindfulJourneyChallenges', CHALLENGES_DATA);
  const [rewards, setRewards] = useLocalStorage<RewardState>('mindfulJourneyRewards', { points: 0 });
  const { toast } = useToast();

  useEffect(() => {
    setGuidedSessions(GUIDED_SESSIONS_DATA);
  }, []);

  const handleToggleChallengeComplete = (challengeId: string) => {
    const updatedChallenges = challenges.map(c => 
      c.id === challengeId ? { ...c, completed: !c.completed } : c
    );
    setChallenges(updatedChallenges);

    const challenge = updatedChallenges.find(c => c.id === challengeId);
    if (challenge) {
      if (challenge.completed) {
        setRewards(prevRewards => ({ points: prevRewards.points + challenge.points }));
        toast({ title: "Challenge Completed!", description: `You earned ${challenge.points} points.` });
      } else {
        // Only deduct if points were previously awarded for this specific completion
        const originalChallenge = CHALLENGES_DATA.find(c => c.id === challengeId);
        if(originalChallenge && challenges.find(c=>c.id === challengeId)?.completed === false){ // Check if it was completed before this toggle
           // This logic is simplified. A robust system would track individual completions.
        }
        // For simplicity, let's assume points are removed if uncompleted.
        // A more complex system would be needed to prevent point exploits.
        setRewards(prevRewards => ({ points: Math.max(0, prevRewards.points - challenge.points) }));
        toast({ title: "Challenge Undone", description: `Points adjusted.` });
      }
    }
  };

  return (
    <div className="space-y-10">
      <PageHeader 
        title="Welcome to Your Mindful Journey" 
        description="Discover practices, track your mood, and grow your well-being."
        icon={LayoutDashboard}
      />

      <section>
        <RewardDisplay points={rewards.points} />
      </section>

      <section>
        <SectionTitle title="Daily Guided Sessions" />
        <GuidedSessionList sessions={guidedSessions} />
      </section>

      <section>
        <SectionTitle title="Mindfulness Challenges" />
        <ChallengeList challenges={challenges} onToggleComplete={handleToggleChallengeComplete} />
      </section>
    </div>
  );
}
