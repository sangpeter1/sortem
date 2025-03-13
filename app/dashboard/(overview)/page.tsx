import { lusitana } from '@/app/ui/fonts';
import RosterManager from '@/app/ui/dashboard/roster-manager';
import { Profile } from '@/app/lib/definitions';
import { fetchProfiles } from '@/app/lib/data';
import { Suspense } from 'react';
import { RosterManagerSkeleton } from '@/app/ui/skeletons';
import { AddProfile } from '@/app/ui/profiles/buttons';

export default async function Page() {
  const students : Profile [] = await fetchProfiles();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
        <Suspense fallback={<RosterManagerSkeleton />}>
          <RosterManager roster={students} />
        </Suspense>
    </main>
  );
}
