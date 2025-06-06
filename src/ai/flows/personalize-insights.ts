// This is an AI-powered code! Please review carefully.

'use server';

/**
 * @fileOverview This file defines a Genkit flow that provides personalized mindfulness insights and suggestions based on user journal entries and logged data.
 *
 * - personalizeInsights - A function that takes user data and returns personalized insights.
 * - PersonalizeInsightsInput - The input type for the personalizeInsights function.
 * - PersonalizeInsightsOutput - The return type for the personalizeInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeInsightsInputSchema = z.object({
  journalEntries: z
    .string()
    .describe('A collection of journal entries, each representing a day.'),
  moodData: z
    .string()
    .describe(
      'A stringified JSON array of mood data points, including mood scores and timestamps.'
    ),
});
export type PersonalizeInsightsInput = z.infer<typeof PersonalizeInsightsInputSchema>;

const PersonalizeInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'Personalized insights derived from the journal entries and mood data, highlighting trends and patterns.'
    ),
  suggestions: z
    .string()
    .describe(
      'Mindfulness practices and suggestions tailored to the users specific needs and emotional patterns, based on the insights.'
    ),
});
export type PersonalizeInsightsOutput = z.infer<typeof PersonalizeInsightsOutputSchema>;

export async function personalizeInsights(input: PersonalizeInsightsInput): Promise<PersonalizeInsightsOutput> {
  return personalizeInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeInsightsPrompt',
  input: {schema: PersonalizeInsightsInputSchema},
  output: {schema: PersonalizeInsightsOutputSchema},
  prompt: `You are a mindfulness and wellbeing expert. Analyze the provided journal entries and mood data to provide personalized insights and suggestions for the user.\n\nJournal Entries:\n{{{journalEntries}}}\n\nMood Data:\n{{{moodData}}}\n\nBased on this information, provide insights into the user's emotional patterns and suggest tailored mindfulness practices.\n\nInsights: \nSuggestions: `,
});

const personalizeInsightsFlow = ai.defineFlow(
  {
    name: 'personalizeInsightsFlow',
    inputSchema: PersonalizeInsightsInputSchema,
    outputSchema: PersonalizeInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
