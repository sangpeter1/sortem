import RosterManager from "./dashboard/roster-manager";

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} md:col-span-1 relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
  <div className="grid md:grid-cols-2">
    <div className="md:col-span-1">
      <CardSkeleton />
      </div>
    <div className="md:col-span-1">
    <CardSkeleton />
    </div>
    </div> 
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestProfilesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-full overflow-hidden rounded-md bg-gray-100`}
      />
        <RosterManagerSkeleton />
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function ProfilesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function ProfilesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <ProfilesMobileSkeleton />
            <ProfilesMobileSkeleton />
            <ProfilesMobileSkeleton />
            <ProfilesMobileSkeleton />
            <ProfilesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Student
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Period
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Restricted Students
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Reading Level
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function RosterSkeleton() {
  const skeletonRows = Array.from({ length: 10 }, (_, index) => (
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
      <td className="px-1 py-4 whitespace-nowrap text-right">
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-2 py-4 whitespace-nowrap">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </td>
      <td className="px-2 py-4 whitespace-nowrap">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1 w-36">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
        </div>
      </td>
    </tr>
  ));

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
            {skeletonRows}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RosterManagerSkeleton() {
  return (
    <div className={`grid gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7`}>
      <div className="md:col-span-5">
        <CardsSkeleton />
        <GroupsSkeleton />
      </div>
      <div className="md:col-span-2">
        <RosterSkeleton />
      </div>
    </div>
  );
}

export  function GroupsSkeleton() {

  return (
    <div className="flex-col space-y-4 h-screen">
      <div className="flex items-center space-x-4">
        <div className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-200 h-10"></div>
        <div className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 h-10 w-20"></div>
        <div className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 h-10 w-20"></div>
      </div>
      <div className={`${shimmer} relative overflow-y-auto rounded-xl bg-gray-100 h-96 w-full p-2 pb-4 mb-4 shadow-sm`}>
        <div className="h-96" />
      </div>
    </div>
  );
}