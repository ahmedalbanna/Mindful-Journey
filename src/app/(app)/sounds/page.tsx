"use client";

import { PageHeader } from '@/components/core/PageHeader';
import { AmbientSoundSelector } from '@/components/features/ambient-sounds/AmbientSoundSelector';
import { Waves } from 'lucide-react';

export default function SoundsPage() {
  return (
    <div className="space-y-10">
      <PageHeader 
        title="Ambient Sounds"
        description="Create a calming atmosphere with a selection of soothing sounds."
        icon={Waves}
      />
      <AmbientSoundSelector />
    </div>
  );
}
