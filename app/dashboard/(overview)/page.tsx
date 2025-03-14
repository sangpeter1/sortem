import { lusitana } from '@/app/ui/fonts';
import RosterManager from '@/app/ui/dashboard/roster-manager';
import { Suspense } from 'react';
import { RosterManagerSkeleton } from '@/app/ui/skeletons';

export const revalidate = false
export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
        <Suspense fallback={<RosterManagerSkeleton />}>
          <RosterManager />
        </Suspense>
    </main>
  );
}
