// src/db/init/seed.js
import { prisma } from '../../utils/prisma.js';

const users = [
  {
    fname: 'Mohammad',
    lname: 'Dahamshi',
    email: 'mohammad.dahamshi@gmail.com',
    passwordHash:
      '$2b$10$x6gir2ZBJ399bARIxkow7uhrOw8fqPojsMeiAc1xMCRRL6CCqwDGS',
  },
  {
    fname: 'Sarah',
    lname: 'Dahamshi',
    email: 'sarah.dahamshi@gmail.com',
    passwordHash:
      '$2b$10$cnAf72pKB2/w.d134QJu1O51s.PSfw0dhwXwWTKkq92XPbaTIUjUC',
  },
  {
    fname: 'Salmah',
    lname: 'Dahamshi',
    email: 'salmah.dahamshi.22@gmail.com',
    passwordHash:
      '$2b$10$cnAf72pKB2/w.d134QJu1O51s.PSfw0dhwXwWTKkq92XPbaTIUjUC',
  },
];

async function main() {
  for (const u of users) {
    const user = await prisma.user.create({ data: u });
    console.log(`✅ Created user ${user.fname} ${user.lname} with root folder`);
  }


}

main()
  .catch((e) => {
    console.error('❌ Error seeding users:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
