'use server';

export async function addProfile(formData: FormData) {
  const rawFormData = {
    studentId: formData.get('studentId'),
    readingLevel: formData.get('readingLevel'),
    attendance: formData.get('attendance'),
    restrictedStudents: formData.getAll('restrictedStudents') as string[],
  };
  // Test it out:
  console.log(rawFormData);
}