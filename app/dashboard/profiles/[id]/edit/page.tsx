import Form from '@/app/ui/profiles/edit-form';
import Breadcrumbs from '@/app/ui/profiles/breadcrumbs';
import { fetchProfiles, fetchProfileById} from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [profile, profiles] = await Promise.all([
    fetchProfileById(id),
    fetchProfiles(),
  ])
  if (!profile) {
    notFound();
  }
  if (!profiles) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form profile={profile} profiles={profiles} />
    </main>
  );
}