import { Suspense } from 'react';
import RosterStudentRow from './roster-student-row';
import { fetchProfilesByPeriod } from '@/app/lib/data';

export default async function Roster() {
  const profiles = await fetchProfilesByPeriod();
  return (
    <div>
      <h2 className="text-lg mb-4 text-center">{'Period 1'}</h2>
      <div className="overflow-y-auto h-screen">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-1 py-4 text-left text-xs font-medium text-gray-500 tracking-wider h-3">
              </th>
              <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 tracking-wider h-3">
                Name
              </th>
              <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 tracking-wider h-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-nowrap px-0 py-0 m-0 text-xs">
                    Restricted Students
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              {profiles.map((student, index) => {
                return (
                <Suspense>
                  <RosterStudentRow student={student} index={index}/>
                </Suspense>
                )
              }                
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}