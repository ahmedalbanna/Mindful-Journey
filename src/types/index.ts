import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export type Mood = 'happy' | 'sad' | 'neutral' | 'anxious' | 'calm' | 'energetic' | 'tired';

export interface JournalEntry {
  id: string;
  date: string; // ISO string
  mood: Mood;
  notes: string;
  rating: number; // 1-5
}

export interface GuidedSession {
  id: string;
  title: string;
  description: string;
  type: 'meditation' | 'breathing' | 'visualization';
  duration: number; // in minutes
  icon: LucideIcon;
  image?: string; // Optional placeholder image URL
  audioSrc?: string; // Optional: if there's actual audio
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  icon: LucideIcon;
}

export interface AmbientSound {
  id: string;
  name: string;
  icon: LucideIcon;
  src: string; // Path to audio file, will be placeholder for now
}

export interface RewardState {
  points: number;
}
