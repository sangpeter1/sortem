import { UpdateProfile, DeleteProfile } from '@/app/ui/profiles/buttons';
import ProfileStatus from '@/app/ui/profiles/status';
import { fetchFilteredProfiles } from '@/app/lib/data';

export default async function StudentProfilesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const profiles = await fetchFilteredProfiles(query, currentPage)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {profiles?.map((profile) => (
              <div
                key={profile.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <ProfileStatus status={profile.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {profile.name}
                    </p>
                    <p>{profile.period} Hour</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateProfile id={profile.id} />
                    <DeleteProfile id={profile.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Student
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Hour
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Unpairable List
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Reading Level
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Attendance Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {profiles?.map((profile) => {
                return (
                  <tr
                    key={profile.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      {profile.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {profile.period}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {profile.restricted_students?.length === 0 || !profile.restricted_students ? 'None' : profile.restricted_students.join(', ')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {profile.reading_level}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <ProfileStatus status={profile.status} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateProfile id={profile.id} />
                        <DeleteProfile id={profile.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
