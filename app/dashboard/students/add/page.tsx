import Form from '@/app/ui/students/create-form';
import Breadcrumbs from '@/app/ui/students/breadcrumbs';
import { fetchStudents } from '@/app/lib/data';
 
export default async function Page() {
  const students = await fetchStudents();
 
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
      <Form students={students} />
    </main>
  );
}