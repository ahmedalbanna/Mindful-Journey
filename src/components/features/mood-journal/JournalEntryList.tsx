"use client";

import type { JournalEntry } from '@/types';
import { JournalEntryCard } from './JournalEntryCard';

interface JournalEntryListProps {
  entries: JournalEntry[];
}

export function JournalEntryList({ entries }: JournalEntryListProps) {
  if (entries.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No journal entries yet. Start by adding one!</p>;
  }

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      {sortedEntries.map((entry) => (
        <JournalEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
