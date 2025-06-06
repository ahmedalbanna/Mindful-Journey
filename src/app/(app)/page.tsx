
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

type ChallengeCompletionState = { id: string; completed: boolean };

export default function DashboardPage() {
  const [guidedSessions, setGuidedSessions] = useState<GuidedSession[]>([]);
  const [challengeCompletionStates, setChallengeCompletionStates] = useLocalStorage<ChallengeCompletionState[]>(
    'mindfulJourneyChallengesCompletion', // Use the new key
    CHALLENGES_DATA.map(c => ({ id: c.id, completed: c.completed }))
  );
  const [rewards, setRewards] = useLocalStorage<RewardState>('mindfulJourneyRewards', { points: 0 });
  const { toast } = useToast();

  useEffect(() => {
    setGuidedSessions(GUIDED_SESSIONS_DATA);
  }, []);

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
        <ChallengeList challenges={challengesForDisplay} onToggleComplete={handleToggleChallengeComplete} />
      </section>
    </div>
  );
}
