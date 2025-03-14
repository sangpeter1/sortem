'use client';

import { Profile, ProfileForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProfile } from '@/app/lib/actions';


export default function EditProfileForm({
  profile,
  profiles,
}: {
  profile: ProfileForm;
  profiles: Profile[];
}) 
{
  const updateProfileWithId = updateProfile.bind(null, profile.id);
  return (
    <form action={updateProfileWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Student Name */}
        <div className="mb-4">
          <label htmlFor="student" className="mb-2 block text-sm font-medium">
            Choose student
          </label>
          <div className="relative">
            <select
              id="student"
              name="studentId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={profile.student_id}
            >
              <option value="" disabled>
                Select a student
              </option>
              {profiles.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Reading Level */}
        <div className="mb-4">
          <label htmlFor="readingLevel" className="mb-2 block text-sm font-medium">
            Reading Level
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="readingLevel"
                name="readingLevel"
                type="number"
                step="1"
                defaultValue={profile.reading_level}
                placeholder="Enter reading level"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Restricted Students */}
        <div className="mb-4">
          <label htmlFor="restrictedStudents" className="mb-2 block text-sm font-medium">
            Restricted Students
          </label>
          <div className="relative">
            <select
              id="restrictedStudents"
              name="restrictedStudents"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              multiple
              defaultValue={profile.restricted_students}
            >
              {profiles.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Period */}
        <div className="mb-4">
          <label htmlFor="period" className="mb-2 block text-sm font-medium">
            Choose Period
          </label>
          <div className="relative">
            <select
              id="period"
              name="period"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={profile.period}
            >
              <option value="" disabled>
                Select a period
              </option>
              {/* Add your period options here */}
            </select>
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Profile Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the profile status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  defaultChecked={profile.status === 'active'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="inactive"
                  name="status"
                  type="radio"
                  value="inactive"
                  defaultChecked={profile.status === 'inactive'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="inactive"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Inactive <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/profiles"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Profile</Button>
      </div>
    </form>
  );
}
