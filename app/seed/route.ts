import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { students, users } from '../lib/placeholder-data';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync('password', salt);

  const insertedUsers = await Promise.all(
    users.map(
      async (user) => await sql`
        INSERT INTO users (id, name, username, email, password)
        VALUES (${user.id}, ${user.name}, ${user.username}, ${user.email}, ${user.password})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedUsers;
}

async function seedPeriods() {
  const periods = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5'];

  const insertedPeriods = await Promise.all(
    periods.map(
      (period) => sql`
        INSERT INTO periods (name)
        VALUES (${period})
        ON CONFLICT (name) DO NOTHING;
      `,
    ),
  );
  return insertedPeriods;
}

async function seedStudents() {
  
  const insertedStudents = await Promise.all(
    students.map(
      (student) => sql`
        INSERT INTO students (id, name, email, image_url)
        VALUES (${student.id}, ${student.name}, ${student.email}, ${student.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedStudents;
}

function getRandomRestrictedStudents(studentId: string, count: number): string[] {
  const otherStudents = students.filter(student => student.id !== studentId);
  const shuffled = otherStudents.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(student => student.id);
}

async function seedProfiles() {
  const profiles = students.map((student) => ({
    id: uuidv4(),
    student_id: student.id,
    period: 'Period 1',
    reading_level: Math.floor(Math.random() * 4) + 1,
    restricted_students: getRandomRestrictedStudents(student.id, Math.floor(Math.random() * 4)),
    status: 'active',
  }));

  const insertedProfiles = await Promise.all(
    profiles.map(
      (profile) => sql`
        INSERT INTO profiles (id, student_id, period, reading_level, status)
        VALUES (${profile.id}, ${profile.student_id}, ${profile.period}, ${profile.reading_level}, ${profile.status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  
  const insertedProfileRestrictions = await Promise.all(
    profiles.flatMap((profile) => 
      profile.restricted_students.map((restrictedStudentId) => 
        sql`
          INSERT INTO profile_restrictions (profile_id, restricted_student_id)
          VALUES (${profile.id}, ${restrictedStudentId})
          ON CONFLICT (profile_id, restricted_student_id) DO NOTHING;
        `
      )
    )
  );

  // Ensure mutual restrictions
  const mutualRestrictions = await Promise.all(
    profiles.flatMap((profile) =>
      profile.restricted_students.map((restrictedStudentId) =>
        sql`
          INSERT INTO profile_restrictions (profile_id, restricted_student_id)
          VALUES (
            (SELECT id FROM profiles WHERE student_id = ${restrictedStudentId} LIMIT 1),
            ${profile.student_id}
          )
          ON CONFLICT (profile_id, restricted_student_id) DO NOTHING;
        `
      )
    )
  );

  return { insertedProfiles, insertedProfileRestrictions, mutualRestrictions };
}

async function updateProfiles() {
  const profiles = await sql`
    SELECT id, student_id FROM profiles
  `;

  await Promise.all(
    profiles.map(async (profile) => {
      const restrictedStudents = await sql`
        SELECT restricted_student_id
        FROM profile_restrictions
        WHERE profile_id = ${profile.id}
      `;
      const restrictedStudentIds = restrictedStudents.map(rs => rs.restricted_student_id);
      await sql`
        UPDATE profiles
        SET restricted_students = ${sql.array(restrictedStudentIds)}
        WHERE id = ${profile.id}
      `;
    })
  );
}

async function insertStudents() {
  // Read and parse the CSV data
  const data = await fs.readFile('app/lib/rosters.csv', 'utf8');
  const rows = data.trim().split('\n').slice(1); // Trim and remove headers if present

  // Create an array of SQL insert queries to execute
  const insertedStudents = await Promise.all(rows.map(async (row) => {
    const columns = row.split(',');
    const name = `${columns[1]} ${columns[0]}`.trim(); // "Last First" format
    console.log(name);

    // Return an insert query for each student
    await sql`
      INSERT INTO students (id, name, email, image_url)
      VALUES (${uuidv4()}, ${name}, '', '')
      ON CONFLICT (id) DO NOTHING;
    `;
  }));

  return insertedStudents; // Return the array of SQL queries
}

async function createProfiles() {
  // Read and parse the CSV data
  const data = await fs.readFile('app/lib/rosters.csv', 'utf8');
  const rows = data.trim().split('\n').slice(1); // Trim and remove headers if present

  // Use async/await properly for each student
  const insertedStudents = rows.map(async (student) => {
    const columns = student.split(',');
    const name = `${columns[1]} ${columns[0]}`.trim(); // "Last First" format
    const period = `Period ${columns[2]}`;

    // Fetch the student_id from the students table
    const studentResult = await sql`
      SELECT id FROM students WHERE name = ${name}
    `;

    // Ensure the student exists
    if (studentResult.length > 0) {
      const studentId = studentResult[0].id;

      // Insert into the profiles table
      await sql`
        INSERT INTO profiles (id, student_id, period)
        VALUES (${uuidv4()}, ${studentId}, ${period})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }) 
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers()
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}