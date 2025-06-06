"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { personalizeInsights, type PersonalizeInsightsInput, type PersonalizeInsightsOutput } from '@/ai/flows/personalize-insights';
import type { JournalEntry } from '@/types';
import { Sparkles, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PersonalizedInsightsDisplayProps {
  journalEntries: JournalEntry[];
}

export function PersonalizedInsightsDisplay({ journalEntries }: PersonalizedInsightsDisplayProps) {
  const [insights, setInsights] = useState<PersonalizeInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setError(null);
    setInsights(null);

    if (journalEntries.length === 0) {
      setError("Please add some journal entries to generate insights.");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare data for AI flow
      const formattedJournalEntries = journalEntries
        .map(entry => `Date: ${entry.date}\nMood: ${entry.mood}\nRating: ${entry.rating}/5\nNotes: ${entry.notes}`)
        .join('\n\n---\n\n');
      
      const moodData = journalEntries.map(entry => ({
        mood: entry.mood,
        score: entry.rating,
        timestamp: entry.date,
      }));

      const input: PersonalizeInsightsInput = {
        journalEntries: formattedJournalEntries,
        moodData: JSON.stringify(moodData),
      };
      
      const result = await personalizeInsights(input);
      setInsights(result);
    } catch (e) {
      console.error("Error generating insights:", e);
      setError("Failed to generate insights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button onClick={handleGenerateInsights} disabled={isLoading || journalEntries.length === 0} size="lg">
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-5 w-5" />
        )}
        Generate Personalized Insights
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Insights...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please wait while we analyze your journal entries.</p>
          </CardContent>
        </Card>
      )}

      {insights && (
        <div className="space-y-6">
          <Card className="bg-background shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">Your Personalized Insights</CardTitle>
              <CardDescription>Based on your journal entries and mood data.</CardDescription>
            </CardHeader>
            <CardContent className="text-base leading-relaxed text-foreground whitespace-pre-line">
              {insights.insights}
            </CardContent>
          </Card>
          <Card className="bg-background shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl text-accent">Tailored Suggestions</CardTitle>
              <CardDescription>Mindfulness practices to support your well-being.</CardDescription>
            </CardHeader>
            <CardContent className="text-base leading-relaxed text-foreground whitespace-pre-line">
              {insights.suggestions}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
