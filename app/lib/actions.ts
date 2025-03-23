'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
// import { Profile } from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  studentId: z.string({
    invalid_type_error: 'Please select a student',
  }),
  readingLevel: z.number(),
  periodId: z.string({
    invalid_type_error: 'Please select a period',
  }),
  status: z.enum(['active', 'inactive']),
  restrictedStudents: z.array(z.string({})),
  groups: z.array(z.array(z.string())),
  groupNames: z.array(z.string()),
  assignmentId: z.string(),
});

export type ProfilesState = {
  errors?: {
    studentId?: string[];
    periodId?: string[];
    readingLevel?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type GroupsState = {
  errors?: {
    groups?: string[];
    groupNames?: string[];
    assignmentId?: string[];
    periodId?: string[];
  };
  message?: string | null;
};
 
const AddProfile = FormSchema.omit({ id: true, groups: true, groupNames: true, assignmentId: true });
const CreateGroups = FormSchema.omit({ id: true, studentId: true, readingLevel: true, status: true, restrictedStudents: true });
 
export async function addProfile(prevState: ProfilesState, formData: FormData) {
  const validatedFields = AddProfile.safeParse({
    studentId: formData.get('studentId'),
    periodId: formData.get('period'),

  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Profile.',
    };
  }

  const { studentId, periodId } = validatedFields.data;
  try {
    await sql`
    INSERT INTO profiles (student_id, period)
    VALUES (${studentId}, ${periodId})
    `;
  } catch(error) {
    console.error('Database Error:', error);
  }

  revalidatePath('/dashboard/students');
  redirect('/dashboard/students');
}

  export async function updateProfile(id: string, formData: FormData) {
    const {studentId, periodId, readingLevel, restrictedStudents } = AddProfile.parse({
      studentId: formData.get('studentId'),
      period: formData.get('period'),
      readingLevel: formData.get('readingLevel'),
      restrictedStudents: formData.getAll('restrictedStudents') as string[],
    });

    try {
      await sql`
      UPDATE profiles
      SET student_id = ${studentId}, period_id = ${periodId}, readingLevel = ${readingLevel}, restricted_students = ${restrictedStudents}
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

  export async function createGroups(prevState: GroupsState, formData: FormData) {
    const validatedFields = CreateGroups.safeParse({
      groups: formData.get('groups'),
      groupNames: formData.get('groupNames'),
      assignmentId: formData.get('assignmentId'),
      periodId: formData.get('periodId'),

    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Group.',
      };
    }
      const { groups, assignmentId, periodId } = validatedFields.data;
    try {
      await sql.begin(async sql => {
        for (let i = 0; i < groups.length; i++) {
          const groupId = await sql`
            INSERT INTO groups (name, assignment_id, period_id)
            VALUES (${groups}, ${assignmentId}, ${periodId})
            RETURNING id
          `;
          for (const student of groups[i]) {
            await sql`
              INSERT INTO group_members (group_id, student_id)
              VALUES (${groupId[0].id}, ${student})
            `;
          }
        }
      });
    } catch (error) {
      console.error('Database Error:', error);
    }
  
    revalidatePath('/dashboard');
    redirect('/dashboard');
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