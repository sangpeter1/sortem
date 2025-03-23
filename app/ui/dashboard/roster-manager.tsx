import { Suspense } from 'react';
import { RosterSkeleton, CardsSkeleton } from '@/app/ui/skeletons'; 
import Roster from './roster';
import Groups from './groups';
import CardWrapper from './cards';
import { fetchProfilesByPeriod } from '@/app/lib/data';

export default async function RosterManager() {
  const profiles = await fetchProfilesByPeriod();
  const assignmentId = '43bd070c-359d-4401-8e73-b6f4a43677e8';
  const periodId = '4501f912-d990-4b27-a646-92e80b1c9a69';
  return (
    <div className={`grid gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7`}>
        <div className="md:col-span-5">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
          <Suspense fallback={<RosterSkeleton />}>
            <Groups students={profiles} assignmentId={assignmentId} periodId={periodId}/>
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