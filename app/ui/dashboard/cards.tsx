import {
  HandRaisedIcon,
  IdentificationIcon,
  NoSymbolIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Profile } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';
import { fetchProfilesByPeriod } from '@/app/lib/data';
const iconMap = {
  active: HandRaisedIcon,
  students: UserGroupIcon,
  inactive: NoSymbolIcon,
  profiles: IdentificationIcon,
};

export default async function CardWrapper() {
  const profiles : Profile[] = await fetchProfilesByPeriod()
  const totalActiveProfiles = profiles?.filter((student) => {
    return student.status === 'active';  
  }).length
  const numberOfStudents = profiles.length;

  return (
    <div className = "grid md:grid-cols-2">
      <Card title="Present" value={totalActiveProfiles} type="active" />
      <Card
        title="Total Students"
        value={numberOfStudents}
        type="students"
      />
    </div>
      
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
    <div className="md:col-span-1 rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-md font-medium">{title}</h3>
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