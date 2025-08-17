// prisma/seed.ts
import { prisma } from "../../utils/prisma.js";
const usersToUpdate = [
  { id: 'cmeejjocz0000k0hzkdgrigdo', email: 'mohammad.dahamshi@gmail.com' },
  { id: 'cmeejjocz0001k0hzfaz9xgo6', email: 'sarah.dahamshi@gmail.com' },
];
async function main() {
// for (const u of usersToUpdate) {
//   await prisma.user.update({
//     where: { id: u.id },
//     data: { email: u.email },
//   });
// }
const res = await prisma.user.findMany()
  console.log(res)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
