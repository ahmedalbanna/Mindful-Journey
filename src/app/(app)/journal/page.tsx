"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/core/PageHeader';
import { SectionTitle } from '@/components/core/SectionTitle';
import { MoodJournalForm } from '@/components/features/mood-journal/MoodJournalForm';
import { JournalEntryList } from '@/components/features/mood-journal/JournalEntryList';
import type { JournalEntry } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';
import { BookOpenText } from 'lucide-react';

export default function JournalPage() {
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('mindfulJourneyEntries', []);
  const { toast } = useToast();

  const handleAddEntry = (newEntryData: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...newEntryData,
      id: Date.now().toString(), // Simple ID generation
    };
    setJournalEntries(prevEntries => [newEntry, ...prevEntries]);
    toast({
      title: "Journal Entry Saved",
      description: "Your mood and thoughts have been recorded.",
    });
  };

  return (
    <div className="space-y-10">
      <PageHeader 
        title="Mood Journal"
        description="Log your daily mood, thoughts, and well-being."
        icon={BookOpenText}
      />

      <section>
        <SectionTitle title="New Journal Entry" />
        <MoodJournalForm onSubmit={handleAddEntry} />
      </section>

      <section>
        <SectionTitle title="Past Entries" />
        <JournalEntryList entries={journalEntries} />
      </section>
    </div>
  );
}
