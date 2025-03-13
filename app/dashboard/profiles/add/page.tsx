import Form from '@/app/ui/profiles/create-form';
import Breadcrumbs from '@/app/ui/profiles/breadcrumbs';
import { fetchProfiles } from '@/app/lib/data';
 
export default async function Page() {
  const profiles = await fetchProfiles();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Students', href: '/dashboard/students' },
          {
            label: 'Add profile',
            href: '/dashboard/students/add',
            active: true,
          },
        ]}
      />
      <Form profiles={profiles} />
    </main>
  );
}