import { Suspense } from 'react';
import { RosterSkeleton, CardsSkeleton } from '@/app/ui/skeletons'; 
import Roster from './roster';
import Groups from './groups';
import CardWrapper from './cards';
import { fetchProfilesByPeriod } from '@/app/lib/data';

export default async function RosterManager() {
  const profiles = await fetchProfilesByPeriod();
  profiles && console.log(profiles)
  return (
    <div className={`grid gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7`}>
        <div className="md:col-span-5">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
          <Suspense fallback={<RosterSkeleton />}>
            <Groups profiles={profiles}/>
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