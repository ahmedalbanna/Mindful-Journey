"use client";

import * as React from 'react';
import { AMBIENT_SOUNDS_DATA } from '@/lib/constants';
import type { AmbientSound } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

// Mock Tone.js Player and Volume for environments where Tone is not fully supported or for simplicity
// In a real scenario, these would be actual Tone.js objects.
class MockPlayer {
  public toDestination = () => this;
  public start = () => Promise.resolve();
  public stop = () => {};
  public state: 'started' | 'stopped' = 'stopped';
  public loop = false;
  public volume: { value: number } = { value: 0 }; // dB
  public loaded = true; // Assume loaded for mock

  constructor(public url: string) {}

  setVolume(val: number) {
    this.volume.value = val;
  }
}

class MockVolume {
    public volume: {value: number} = {value: 0}; // dB
    public toDestination = () => this;
    constructor(initialVolume = 0) {
        this.volume.value = initialVolume;
    }
    dispose() {}
}


export function AmbientSoundSelector() {
  const [activeSound, setActiveSound] = React.useState<AmbientSound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(50); // 0-100 scale for UI
  const playerRef = React.useRef<MockPlayer | null>(null);
  const volumeNodeRef = React.useRef<MockVolume | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    // Dynamically import Tone.js only on the client side
    if (typeof window !== 'undefined') {
      import('tone').then(Tone => {
        // Initialize Tone.js objects if needed, or handle actual playback here
        // This example keeps using Mocks for simplicity of demonstration without actual audio files.
      }).catch(err => console.error("Failed to load Tone.js", err));
    }

    return () => {
      playerRef.current?.stop();
      playerRef.current = null; // Basic cleanup for mock
      volumeNodeRef.current?.dispose();
      volumeNodeRef.current = null;
    };
  }, []);
  
  const linearToDecibels = (linear: number): number => {
    if (linear <= 0) return -Infinity;
    return 20 * Math.log10(linear);
  };

  React.useEffect(() => {
    if (volumeNodeRef.current) {
       // Convert 0-100 slider to appropriate dB range, e.g., -60dB to 0dB
      const newVolumeInDb = linearToDecibels(volume / 100);
      volumeNodeRef.current.volume.value = newVolumeInDb;
    }
    if (playerRef.current) {
        // Also update player's direct volume if it's used that way
        (playerRef.current as any).setVolume?.(linearToDecibels(volume / 100));
    }
  }, [volume]);

  const handlePlayPause = async (sound: AmbientSound) => {
    if (activeSound?.id === sound.id && isPlaying) { // Pause current sound
      playerRef.current?.stop();
      setIsPlaying(false);
    } else { // Play new sound or resume
      if (playerRef.current && activeSound?.id !== sound.id) {
        playerRef.current.stop(); // Stop previous sound
      }
      
      // For demonstration, we use a mock player.
      // In a real app with Tone.js:
      // if (!volumeNodeRef.current) {
      //   volumeNodeRef.current = new Tone.Volume(linearToDecibels(volume / 100)).toDestination();
      // }
      // if (!playerRef.current || activeSound?.id !== sound.id) {
      //   playerRef.current = new Tone.Player(sound.src).connect(volumeNodeRef.current);
      //   await Tone.loaded(); // Wait for the player to load
      // }
      
      // Using mock player
      if (!volumeNodeRef.current) {
         volumeNodeRef.current = new MockVolume(linearToDecibels(volume / 100));
      }
      if (!playerRef.current || activeSound?.id !== sound.id) {
        playerRef.current = new MockPlayer(sound.src);
        // Simulate connecting to volume node
        (playerRef.current as any).setVolume?.(volumeNodeRef.current.volume.value);
      }


      if (playerRef.current?.loaded) {
        playerRef.current.loop = true;
        await playerRef.current.start();
        playerRef.current.state = 'started';
        setActiveSound(sound);
        setIsPlaying(true);
        toast({ title: "Playing Sound", description: `Now playing ${sound.name}. (Simulated)` });
      } else {
        toast({ title: "Error", description: "Sound could not be loaded. (Simulated)", variant: "destructive" });
      }
    }
  };


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Ambient Sounds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {AMBIENT_SOUNDS_DATA.map((sound) => (
            <Button
              key={sound.id}
              variant={activeSound?.id === sound.id && isPlaying ? "default" : "outline"}
              onClick={() => handlePlayPause(sound)}
              className="flex flex-col items-center justify-center h-24 p-2 text-center"
            >
              <sound.icon className="h-8 w-8 mb-2" />
              <span className="text-xs">{sound.name}</span>
            </Button>
          ))}
        </div>
        {activeSound && (
          <div className="p-4 border rounded-lg space-y-3 bg-muted/50">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Now Playing: {activeSound.name}</p>
              <Button variant="ghost" size="icon" onClick={() => handlePlayPause(activeSound)}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {volume === 0 ? <VolumeX className="h-5 w-5 text-muted-foreground" /> : <Volume2 className="h-5 w-5 text-muted-foreground" />}
              <Slider
                defaultValue={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="w-full"
                aria-label="Volume control"
              />
            </div>
             <p className="text-xs text-muted-foreground text-center">Note: Actual sound playback requires audio files and full Tone.js integration.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
