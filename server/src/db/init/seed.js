// prisma/seed.ts
import { prisma } from '../../utils/prisma.js';

async function main() {
  const res = await prisma.user.createMany({
    data: [
      {
        fname: 'Mohammad',
        lname: 'Dahamshi',
        email: 'mohammad.dahamshi@example.com',
        passwordHash:
          '$2b$10$x6gir2ZBJ399bARIxkow7uhrOw8fqPojsMeiAc1xMCRRL6CCqwDGS',
      },
      {
        fname: 'Sarah',
        lname: 'Dahamshi',
        email: 'sarah.dahamshi@example.com',
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
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
