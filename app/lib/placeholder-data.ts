// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

import { v4 as uuidv4 } from 'uuid';

// Generate a list of students with UUIDs and names
const students = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john@doe.com',
    image_url: '/students/john-doe.png',
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'jane@smith.com',
    image_url: '/students/jane-smith.png',
  },
  {
    id: uuidv4(),
    name: 'Alice Johnson',
    email: 'alice@johnson.com',
    image_url: '/students/alice-johnson.png',
  },
  {
    id: uuidv4(),
    name: 'Bob Brown',
    email: 'bob@brown.com',
    image_url: '/students/bob-brown.png',
  },
  {
    id: uuidv4(),
    name: 'Charlie Davis',
    email: 'charlie@davis.com',
    image_url: '/students/charlie-davis.png',
  },
  {
    id: uuidv4(),
    name: 'Diana Evans',
    email: 'diana@evans.com',
    image_url: '/students/diana-evans.png',
  },
  {
    id: uuidv4(),
    name: 'Ethan Harris',
    email: 'ethan@harris.com',
    image_url: '/students/ethan-harris.png',
  },
  {
    id: uuidv4(),
    name: 'Fiona Clark',
    email: 'fiona@clark.com',
    image_url: '/students/fiona-clark.png',
  },
  {
    id: uuidv4(),
    name: 'George Lewis',
    email: 'george@lewis.com',
    image_url: '/students/george-lewis.png',
  },
  {
    id: uuidv4(),
    name: 'Hannah Walker',
    email: 'hannah@walker.com',
    image_url: '/students/hannah-walker.png',
  },
  {
    id: uuidv4(),
    name: 'Ian Young',
    email: 'ian@young.com',
    image_url: '/students/ian-young.png',
  },
  {
    id: uuidv4(),
    name: 'Julia Hall',
    email: 'julia@hall.com',
    image_url: '/students/julia-hall.png',
  },
  {
    id: uuidv4(),
    name: 'Kevin Allen',
    email: 'kevin@allen.com',
    image_url: '/students/kevin-allen.png',
  },
  {
    id: uuidv4(),
    name: 'Laura King',
    email: 'laura@king.com',
    image_url: '/students/laura-king.png',
  },
  {
    id: uuidv4(),
    name: 'Michael Wright',
    email: 'michael@wright.com',
    image_url: '/students/michael-wright.png',
  },
  {
    id: uuidv4(),
    name: 'Nina Scott',
    email: 'nina@scott.com',
    image_url: '/students/nina-scott.png',
  },
  {
    id: uuidv4(),
    name: 'Oliver Green',
    email: 'oliver@green.com',
    image_url: '/students/oliver-green.png',
  },
  {
    id: uuidv4(),
    name: 'Paula Adams',
    email: 'paula@adams.com',
    image_url: '/students/paula-adams.png',
  },
  {
    id: uuidv4(),
    name: 'Quincy Baker',
    email: 'quincy@baker.com',
    image_url: '/students/quincy-baker.png',
  },
  {
    id: uuidv4(),
    name: 'Rachel Nelson',
    email: 'rachel@nelson.com',
    image_url: '/students/rachel-nelson.png',
  },
  {
    id: uuidv4(),
    name: 'Sam Carter',
    email: 'sam@carter.com',
    image_url: '/students/sam-carter.png',
  },
  {
    id: uuidv4(),
    name: 'Tina Mitchell',
    email: 'tina@mitchell.com',
    image_url: '/students/tina-mitchell.png',
  },
  {
    id: uuidv4(),
    name: 'Ursula Perez',
    email: 'ursula@perez.com',
    image_url: '/students/ursula-perez.png',
  },
  {
    id: uuidv4(),
    name: 'Victor Roberts',
    email: 'victor@roberts.com',
    image_url: '/students/victor-roberts.png',
  },
  {
    id: uuidv4(),
    name: 'Wendy Turner',
    email: 'wendy@turner.com',
    image_url: '/students/wendy-turner.png',
  },
  {
    id: uuidv4(),
    name: 'Xander Phillips',
    email: 'xander@phillips.com',
    image_url: '/students/xander-phillips.png',
  },
  {
    id: uuidv4(),
    name: 'Yvonne Campbell',
    email: 'yvonne@campbell.com',
    image_url: '/students/yvonne-campbell.png',
  },
  {
    id: uuidv4(),
    name: 'Zachary Parker',
    email: 'zachary@parker.com',
    image_url: '/students/zachary-parker.png',
  },
  {
    id: uuidv4(),
    name: 'Adam Johnson',
    email: 'adam@johnson.com',
    image_url: '/students/adam-johnson.png',
  },
  {
    id: uuidv4(),
    name: 'Betty White',
    email: 'betty@white.com',
    image_url: '/students/betty-white.png',
  },
  {
    id: uuidv4(),
    name: 'Carl Black',
    email: 'carl@black.com',
    image_url: '/students/carl-black.png',
  },
  {
    id: uuidv4(),
    name: 'Daisy Blue',
    email: 'daisy@blue.com',
    image_url: '/students/daisy-blue.png',
  },
];

// Helper function to get a random subset of student IDs
function getRandomRestrictedStudents(studentId: string, count: number): string[] {
  const otherStudents = students.filter(student => student.id !== studentId);
  const shuffled = otherStudents.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(student => student.id);
}

// Generate a list of profiles with restricted students, reading level, and status
const profiles = students.map(student => ({
  id: uuidv4(),
  student_id: student.id,
  period_name: 'Period 1',
  reading_level: Math.floor(Math.random() * 4) + 1,
  restricted_students: getRandomRestrictedStudents(student.id, Math.floor(Math.random() * 5) + 1),
  status: 'active',
}));

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    username: 'user',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Zara Pylvainen',
    username: 'pylvainenz',
    email: 'zara.pylvainen@gmail.com',
    password: 'bups1066',
  }
];

export { users, students, profiles };
