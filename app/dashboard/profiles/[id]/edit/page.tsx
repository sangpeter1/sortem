import Form from '@/app/ui/profiles/edit-form';
import Breadcrumbs from '@/app/ui/profiles/breadcrumbs';
import { fetchProfiles, fetchProfileById} from '@/app/lib/data';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [profile, profiles] = await Promise.all([
    fetchProfileById(id),
    fetchProfiles(),
  ])
  // ...
}