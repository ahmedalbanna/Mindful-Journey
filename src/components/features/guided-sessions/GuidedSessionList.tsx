"use client";

import type { GuidedSession } from '@/types';
import { GuidedSessionCard } from './GuidedSessionCard';
import { useToast } from "@/hooks/use-toast";

interface GuidedSessionListProps {
  sessions: GuidedSession[];
}

export function GuidedSessionList({ sessions }: GuidedSessionListProps) {
  const { toast } = useToast();

  const handlePlaySession = (session: GuidedSession) => {
    toast({
      title: "Starting Session",
      description: `Playing "${session.title}". Actual audio playback would start here.`,
    });
    // In a real app, you would handle audio playback here.
    console.log("Playing session:", session.title, session.audioSrc);
  };

  if (sessions.length === 0) {
    return <p className="text-muted-foreground">No guided sessions available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <GuidedSessionCard key={session.id} session={session} onPlay={handlePlaySession} />
      ))}
    </div>
  );
}
