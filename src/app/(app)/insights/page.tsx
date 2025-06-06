"use client";

import { PageHeader } from '@/components/core/PageHeader';
import { PersonalizedInsightsDisplay } from '@/components/features/insights/PersonalizedInsightsDisplay';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { JournalEntry } from '@/types';
import { Lightbulb } from 'lucide-react';

export default function InsightsPage() {
  const [journalEntries] = useLocalStorage<JournalEntry[]>('mindfulJourneyEntries', []);

  return (
    <div className="space-y-10">
      <PageHeader 
        title="Personalized Insights"
        description="Discover trends and suggestions based on your mindfulness journey."
        icon={Lightbulb}
      />
      <PersonalizedInsightsDisplay journalEntries={journalEntries} />
       {journalEntries.length === 0 && (
        <p className="text-muted-foreground text-center py-4">
          Add some journal entries to enable personalized insights.
        </p>
      )}
    </div>
  );
}
