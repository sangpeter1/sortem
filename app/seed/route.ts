import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { students, users } from '../lib/placeholder-data';
import { v4 as uuidv4 } from 'uuid';
import { ProfilesTable } from '../lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync('password', salt);

  const insertedUsers = await Promise.all(
    users.map(
      (user) => sql`
        INSERT INTO users (id, username, email, password)
        VALUES (${user.id}, ${user.name}, ${password})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedUsers;
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
async function seedProfiles() {
  const profiles: ProfilesTable[] = await sql<ProfilesTable[]>`
    SELECT * FROM profiles;
  `; 
  const insertedProfileRestrictions = await Promise.all(
    profiles.flatMap((profile) => {
      profile.restricted_students.map((restrictedStudentId) => {
        if (restrictedStudentId) {
          sql`
          INSERT INTO profile_restrictions (profile_id, restricted_student_id)
          VALUES (${profile.id}, ${restrictedStudentId})
          ON CONFLICT (profile_id, restricted_student_id) DO NOTHING;
        `;
        }
      });
    }) 
  );

  return insertedProfileRestrictions;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedProfiles()
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
