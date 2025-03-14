import postgres from 'postgres';
import {
  StudentField,
  StudentsTableType,
  ProfileForm,
  ProfilesTable,
  Profile,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchLatestProfiles() {
  try {
    const data = await sql<Profile[]>`
      SELECT profiles.id, profiles.reading_level, students.name, profiles.period, profiles.status
      FROM profiles
      JOIN students ON profiles.student_id = students.id
      ORDER BY students.name DESC`
    
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest profiles.');
  }
}

export async function fetchProfilesByPeriod() {
  const period = 'Period 1';
  try {
    const data = await sql<Profile[]>`
      SELECT profiles.id, students.id, students.name, profiles.reading_level, profiles.period, profiles.status
      FROM profiles
      JOIN students ON profiles.student_id = students.id
      WHERE profiles.period = ${period}
      ORDER BY period DESC`;
    console.log('data inside fetchProfilesByPeriod', data)
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest profiles.');
  }
}

export async function fetchCardData() {
  try {
    const profileCountPromise = sql`SELECT COUNT(*) FROM profiles`;
    const studentCountPromise = sql`SELECT COUNT(*) FROM students`;
    const profileStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS "active",
         SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) AS "inactive"
         FROM profiles`;

    const data = await Promise.all([
      profileCountPromise,
      studentCountPromise,
      profileStatusPromise,
    ]);

    const numberOfProfiles = Number(data[0][0].count ?? '0');
    const numberOfStudents = Number(data[1][0].count ?? '0');
    const totalActiveProfiles = Number(data[2][0].active ?? '0');
    const totalInactiveProfiles = Number(data[2][0].inactive ?? '0');

    return {
      numberOfProfiles,
      numberOfStudents,
      totalActiveProfiles,
      totalInactiveProfiles,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProfiles(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const profiles = await sql<ProfilesTable[]>`
      SELECT
        profiles.id,
        profiles.reading_level,
        profiles.status,
        profiles.period,
        students.name,
        restricted_students
      FROM profiles
      JOIN students ON profiles.student_id = students.id
      LEFT JOIN profile_restrictions ON profiles.id = profile_restrictions.profile_id
      LEFT JOIN students AS restricted_students ON profile_restrictions.restricted_student_id = restricted_students.id
      WHERE
        students.name ILIKE ${`%${query}%`} OR
        profiles.reading_level::text ILIKE ${`%${query}%`} OR
        profiles.period::text ILIKE ${`%${query}%`} OR
        restricted_students.name ILIKE ${`%${query}%`} OR
        profiles.status ILIKE ${`%${query}%`}
      GROUP BY profiles.id, students.name
      ORDER BY students.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return profiles;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch profiles.');
  }
}

export async function fetchProfilesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM profiles
    JOIN students ON profiles.student_id = students.id
    WHERE
      students.name ILIKE ${`%${query}%`} OR
      profiles.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of profiles.');
  }
}

export async function fetchProfileById(id: string) {
  try {
    const data = await sql<ProfileForm[]>`
      SELECT
        profiles.id,
        profiles.student_id,
        profiles.reading_level,
        profiles.status
      FROM profiles
      WHERE profiles.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch profile.');
  }
}

export async function fetchStudents() {
  try {
    const students = await sql<StudentField[]>`
      SELECT
        id,
        name
      FROM students
      ORDER BY name ASC
    `;

    return students;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all students.');
  }
}

export async function fetchFilteredStudents(query: string) {
  try {
    const data = await sql<StudentsTableType[]>`
        SELECT
          students.id,
          students.name,
          COUNT(profiles.id) AS total_profiles,
          SUM(CASE WHEN students.status = 'active' THEN 1 ELSE 0 END) AS total_active,
          SUM(CASE WHEN students.status = 'inactive' THEN 1 ELSE 0 END) AS total_inactive
        FROM students
        LEFT JOIN profiles ON students.id = profiles.student_id
        WHERE
          students.name ILIKE ${`%${query}%`}
        GROUP BY students.id, students.name
        ORDER BY students.name ASC
      `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch student table.');
  }
}

export async function groupStudentsByPeriod(period_name: string, num_groups: number) {
  const profiles: Profile[] = await sql<Profile[]>`
    SELECT p.id, p.student_id, p.reading_level, p.status, pr.restricted_student_id
    FROM profiles p
    LEFT JOIN profile_restrictions pr ON p.id = pr.profile_id
    WHERE p.period_name = ${period_name} AND p.status = 'active'
    ORDER BY p.reading_level DESC
  `;

   type Group = Profile[];
    // Implement your grouping logic here
    // For simplicity, this example just returns the profiles sorted by reading_level
    const groups: Group[] = Array.from({ length: num_groups }, () => []);
    console.log(profiles)
    profiles.forEach((profile, index) => {
      groups[index % num_groups].push(profile);
    });
  
    return groups;
  }

