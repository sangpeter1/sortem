'use server';

// import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  studentId: z.string({
    invalid_type_error: 'Please select a student',
  }),
  readingLevel: z.number(),
  period: z.string({
    invalid_type_error: 'Please select a period',
  }),
  status: z.enum(['active', 'inactive']),
  restrictedStudents: z.array(z.string({})),
});

export type State = {
  errors?: {
    studentId?: string[];
    period?: string[];
  };
  message?: string | null;
};
 
const AddProfile = FormSchema.omit({ id: true, status: true});
 
export async function addProfile(prevState: State, formData: FormData) {
  const validatedFields = AddProfile.safeParse({
    studentId: formData.get('studentId'),
    period: formData.get('period'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Profile.',
    };
  }

  const { studentId, period } = validatedFields.data;
  try {
    await sql`
    INSERT INTO profiles (student_id, period)
    VALUES (${studentId}, ${period})
    `;
  } catch(error) {
    console.error('Database Error:', error);
  }

  revalidatePath('/dashboard/students');
  redirect('/dashboard/students');
}

  export async function updateProfile(id: string, formData: FormData) {
    const {studentId, period, readingLevel, restrictedStudents } = AddProfile.parse({
      studentId: formData.get('studentId'),
      period: formData.get('period'),
      readingLevel: formData.get('readingLevel'),
      restrictedStudents: formData.getAll('restrictedStudents') as string[],
    });

    try {
      await sql`
      UPDATE profiles
      SET student_id = ${studentId}, period = ${period}, readingLevel = ${readingLevel}, restricted_students = ${restrictedStudents}
      WHERE id = ${id} 
      `;

    } catch(error) {
      console.error('Database Error:', error);
    }
    
    revalidatePath('/dashboard/students');
    redirect('/dashboard/students');
}
  
  export async function deleteProfile(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/overview');
  }

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }