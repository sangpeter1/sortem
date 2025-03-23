// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Profile = {
  id: string;
  studentId: string;
  name: string;
  period: string;
  reading_level: number;
  restricted_students: string[];
  status: 'active' | 'inactive';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestProfile = {
  id: string;
  name: string;
  image_url: string;
  reading_level: number;
  period: string;
  status: 'active' | 'inactive';
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestProfileRaw = Omit<LatestProfile, 'period'> & {
  period: string;
};

export type ProfilesTable = {
  id: string;
  student_id: string;
  name: string;
  image_url: string;
  period: string;
  reading_level: number;
  restricted_students: string[];
  status: 'active' | 'inactive';
};

export type StudentsTableType = {
  id: string;
  name: string;
  total_active: number;
  total_inactive: number;
};

export type FormattedStudentsTable = {
  id: string;
  name: string;
  email: string;
  period: string;
  image_url: string;
  total_active: number;
  total_inactive: number;};

export type ProfileField = {
  id: string;
  name: string;
  period_id: string;
};

export type ProfileForm = {
  id: string;
  name: string;
  student_id: string;
  restricted_students: string[];
  period_name: string;
  period_id: string;
  reading_level: number;
  status: 'active' | 'inactive';
};

export type Group = { id: string; student_id: string; reading_level: number; status: string; restricted_student_id: string | null };
