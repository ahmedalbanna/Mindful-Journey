import type { NavItem, GuidedSession, Challenge, AmbientSound, Mood } from '@/types';
import { LayoutDashboard, BookOpenText, Lightbulb, Waves, Trophy, Sparkles, SlidersHorizontal, Edit3, CloudRain, Leaf, Sun, Moon } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Mood Journal', href: '/journal', icon: BookOpenText },
  { title: 'Personalized Insights', href: '/insights', icon: Lightbulb },
  { title: 'Challenges', href: '/challenges', icon: Trophy },
  { title: 'Ambient Sounds', href: '/sounds', icon: Waves },
];

export const APP_NAME = "Mindful Journey";

export const MOOD_OPTIONS: { value: Mood; label: string; icon?: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { value: 'happy', label: 'Happy' },
    { value: 'calm', label: 'Calm' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'sad', label: 'Sad' },
    { value: 'anxious', label: 'Anxious' },
    { value: 'energetic', label: 'Energetic' },
    { value: 'tired', label: 'Tired' },
];

export const GUIDED_SESSIONS_DATA: GuidedSession[] = [
  {
    id: 'gs1',
    title: 'Morning Meditation',
    description: 'Start your day with calm and focus. This 10-minute meditation helps set a positive tone.',
    type: 'meditation',
    duration: 10,
    icon: Sparkles,
    image: 'https://placehold.co/600x400.png',
    audioSrc: '/sounds/morning_meditation.mp3',
  },
  {
    id: 'gs2',
    title: 'Box Breathing',
    description: 'A simple 5-minute breathing exercise to reduce stress and improve concentration.',
    type: 'breathing',
    duration: 5,
    icon: SlidersHorizontal,
    image: 'https://placehold.co/600x400.png',
    audioSrc: '/sounds/box_breathing.mp3',
  },
  {
    id: 'gs3',
    title: 'Peaceful Visualization',
    description: 'Journey to a serene place in your mind with this 15-minute guided visualization.',
    type: 'visualization',
    duration: 15,
    icon: Edit3,
    image: 'https://placehold.co/600x400.png',
    audioSrc: '/sounds/peaceful_visualization.mp3',
  },
];

export const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'ch1',
    title: '7-Day Meditation Streak',
    description: 'Complete a guided meditation session every day for 7 days.',
    points: 100,
    completed: false,
    icon: Trophy,
  },
  {
    id: 'ch2',
    title: 'Mindful Moment',
    description: 'Take 5 minutes for a mindful breathing exercise today.',
    points: 20,
    completed: false,
    icon: Sparkles,
  },
  {
    id: 'ch3',
    title: 'Journaling Habit',
    description: 'Log your mood and write a journal entry for 3 consecutive days.',
    points: 50,
    completed: false,
    icon: BookOpenText,
  },
];

export const AMBIENT_SOUNDS_DATA: AmbientSound[] = [
  { id: 'sound1', name: 'Rainfall', icon: CloudRain, src: '/sounds/ambient/rainfall.mp3' },
  { id: 'sound2', name: 'Forest Ambience', icon: Leaf, src: '/sounds/ambient/forest.mp3' },
  { id: 'sound3', name: 'Ocean Waves', icon: Waves, src: '/sounds/ambient/ocean.mp3' },
  { id: 'sound4', name: 'Gentle Stream', icon: Sun, src: '/sounds/ambient/stream.mp3' },
  { id: 'sound5', name: 'Night Crickets', icon: Moon, src: '/sounds/ambient/crickets.mp3' },
];
