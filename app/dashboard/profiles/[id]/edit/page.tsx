// import { fetchProfiles, fetchProfileById} from '@/app/lib/data';
// import { notFound } from 'next/navigation';

// export default async function Page(props: { params: Promise<{ id: string }> }) {
//   const params = await props.params;
//   const id = params.id;
//   const [profile, profiles] = await Promise.all([
//     fetchProfileById(id),
//     fetchProfiles(),
//   ])
//   if (!profile) {
//     notFound();
//   }
//   if (!profiles) {
//     notFound();
//   }
//   // ...
// }