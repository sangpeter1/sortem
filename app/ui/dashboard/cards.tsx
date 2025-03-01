import {
  HandRaisedIcon,
  IdentificationIcon,
  NoSymbolIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  active: HandRaisedIcon,
  students: UserGroupIcon,
  inactive: NoSymbolIcon,
  profiles: IdentificationIcon,
};

export default async function CardWrapper() {
  const {
    numberOfProfiles,
    numberOfStudents,
    totalActiveProfiles,
    totalInactiveProfiles,
  } = await fetchCardData();

  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Active Profiles" value={totalActiveProfiles} type="active" />
      <Card title="Inactive Profiles" value={totalInactiveProfiles} type="inactive" />
      <Card title="Total Profiles" value={numberOfProfiles} type="profiles" />
      <Card
        title="Total Students"
        value={numberOfStudents}
        type="students"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'profiles' | 'students' | 'inactive' | 'active';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}