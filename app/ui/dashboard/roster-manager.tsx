import { Suspense } from 'react';
import { RosterSkeleton, CardsSkeleton } from '@/app/ui/skeletons'; 
import Roster from './roster';
import Groups from './groups';
import CardWrapper from './cards';

export default function RosterManager() {
  return (
    <div className={`grid gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7`}>
        <div className="md:col-span-5">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
          <Suspense fallback={<RosterSkeleton />}>
            <Groups />
          </Suspense>
          </div>

        <div className="md:col-span-2">
        <Suspense fallback={<RosterSkeleton/>}>
          <Roster />
        </Suspense>
        </div>
    </div>
  );
}