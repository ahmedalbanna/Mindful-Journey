// 'use server';

/**
 * @fileOverview Summarizes mood journal entries to identify emotional trends and triggers.
 *
 * - summarizeMoodJournal - A function that takes mood journal entries as input and returns a summary of emotional trends and potential triggers.
 * - SummarizeMoodJournalInput - The input type for the summarizeMoodJournal function.
 * - SummarizeMoodJournalOutput - The return type for the summarizeMoodJournal function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMoodJournalInputSchema = z.object({
  journalEntries: z.string().describe('A list of mood journal entries.'),
});
export type SummarizeMoodJournalInput = z.infer<typeof SummarizeMoodJournalInputSchema>;

const SummarizeMoodJournalOutputSchema = z.object({
  summary: z.string().describe('A summary of emotional trends and potential triggers.'),
});
export type SummarizeMoodJournalOutput = z.infer<typeof SummarizeMoodJournalOutputSchema>;

export async function summarizeMoodJournal(input: SummarizeMoodJournalInput): Promise<SummarizeMoodJournalOutput> {
  return summarizeMoodJournalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMoodJournalPrompt',
  input: {schema: SummarizeMoodJournalInputSchema},
  output: {schema: SummarizeMoodJournalOutputSchema},
  prompt: `You are a mental well-being expert. Please analyze the following mood journal entries and provide a summary of emotional trends and potential triggers over time. Use clear, concise language.

Journal Entries:
{{{journalEntries}}}`,
});

const summarizeMoodJournalFlow = ai.defineFlow(
  {
    name: 'summarizeMoodJournalFlow',
    inputSchema: SummarizeMoodJournalInputSchema,
    outputSchema: SummarizeMoodJournalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
