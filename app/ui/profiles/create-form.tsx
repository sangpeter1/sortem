// 'use client';

// import { useActionState } from 'react';
// import { Profile } from '@/app/lib/definitions';
// import Link from 'next/link';
// import {
//   ClockIcon,
//   NoSymbolIcon,
//   BookOpenIcon,
//   HandRaisedIcon,
//   UserCircleIcon,
//   UsersIcon
// } from '@heroicons/react/24/outline';
// import { Button } from '@/app/ui/button';
// import { addProfile, State } from '@/app/lib/actions';


// export default function Form({ profiles }: { profiles: Profile[] }) {
//   const initialState: State = { message: null, errors: {} };
//   const [state, formAction] = useActionState(addProfile, initialState);

//   return (
//     <form action={formAction}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         {/* Student Name */}
//         <div className="mb-4">
//           <label htmlFor="customer" className="mb-2 block text-sm font-medium">
//             Choose student
//           </label>
//           <div className="relative">
//             <select
//               id="customer"
//               name="customerId"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//             >
//               <option value="" disabled>
//                 Select a student
//               </option>
//               {profiles.map((student) => (
//                 <option key={student.id} value={student.id}>
//                   {student.name}
//                 </option>
//               ))}
//             </select>
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//          {/* List of Restricted Students */}     
//         <div className="mb-4">
//           <label htmlFor="customer" className="mb-2 block text-sm font-medium">
//             Choose students restricted to work with
//           </label>
//           <div className="relative">
//             <select
//               id="student"
//               name="studentId"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//               aria-describedby="customer-error"

//             >
//               <option value="" disabled>
//                 Select students
//               </option>
//               {profiles.map((profile) => (
//                 <option key={profile.id} value={profile.id}>
//                   {profile.name}
//                 </option>
//               ))}
//             </select>
//             <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//           <div id="customer-error" aria-live="polite" aria-atomic="true">
//         {state.errors?.studentId &&
//           state.errors.studentId.map((error: string) => (
//             <p className="mt-2 text-sm text-red-500" key={error}>
//               {error}
//             </p>
//           ))}
//       </div>
//         </div>

//         <div className="mb-4">
//           <label htmlFor="customer" className="mb-2 block text-sm font-medium">
//             Choose Period
//           </label>
//           <div className="relative">
//             <select
//               id="customer"
//               name="customerId"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//             >
//               <option value="" disabled>
//                 Select an hour
//               </option>
//               {['1st','2nd','3rd','5th','6th'].map((hour, index) => (
//                 <option key={index} value={hour + ' Hour'}>
//                   {hour + ' Hour'}
//                 </option>
//               ))}
//             </select>
//             <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* Invoice Amount */}
//         <div className="mb-4">
//           <label htmlFor="amount" className="mb-2 block text-sm font-medium">
//             Set the reading level
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="amount"
//                 name="amount"
//                 type="number"
//                 step="0.01"
//                 placeholder="Enter the reading level"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 required
//               />
//               <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>

//         {/* Invoice Status */}
//         <fieldset>
//           <legend className="mb-2 block text-sm font-medium">
//             Set Attendence status
//           </legend>
//           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   id="inactive"
//                   name="status"
//                   type="radio"
//                   value="pending"
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                 />
//                 <label
//                   htmlFor="inactive"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
//                 >
//                  Inactive <NoSymbolIcon className="h-4 w-4" />
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   id="active"
//                   name="status"
//                   type="radio"
//                   value="paid"
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                 />
//                 <label
//                   htmlFor="active"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
//                 >
//                   Active <HandRaisedIcon className="h-4 w-4" />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </fieldset>
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/profiles"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Add Profile</Button>
//       </div>
//     </form>
//   );
// }
