'use client';
import { useState } from 'react';
import { Profile } from '@/app/lib/definitions';
import { Suspense } from 'react';
import { RosterSkeleton, CardsSkeleton } from '@/app/ui/skeletons'; 
import Roster from './roster';
import Groups from './groups';
import CardWrapper from './cards';

export default function RosterManager({ roster } : { roster: Profile[] }) {
  const [activeRoster, setActiveRoster] = useState(roster);

  const updateRoster = (studentId: string, updates: Partial<Profile>) => {
    setActiveRoster(prevRoster =>
      prevRoster.map(student =>
        student.id === studentId ? { ...student, ...updates } : { ...student }
      )
    );

  };
  return (
    <div className={`grid gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7`}>
        <div className="md:col-span-5">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper students={activeRoster} />
          </Suspense>
          <Suspense fallback={<RosterSkeleton />}>
            <Groups students={activeRoster} />
          </Suspense>
          </div>

        <div className="md:col-span-2">
        <Suspense fallback={<RosterSkeleton/>}>
          <Roster students={activeRoster} updateRoster={updateRoster} />
        </Suspense>
        </div>
    </div>
  );
}