'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  readingLevel: z.number(),
  period: z.string(),
  status: z.enum(['active', 'inactive']),
  restrictedStudents: z.array(z.string()),
});
 
const AddProfile = FormSchema.omit({ id: true, status: true,readingLevel: true});
 
export async function addProfile(formData: FormData) {
  const {studentId, period,restrictedStudents } = AddProfile.parse({
    studentId: formData.get('studentId'),
    period: formData.get('period'),
    restrictedStudents: formData.getAll('restrictedStudents') as string[],
  });

  await sql`
    INSERT INTO profiles (student_id, period, restricted_students)
    VALUES (${studentId}, ${period}, ${sql.array(restrictedStudents)})
    `;

    revalidatePath('/dashboard/students');
    redirect('/dashboard/students');

  }

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}