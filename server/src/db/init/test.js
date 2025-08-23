// prisma/seed.ts
import { prisma } from "../../utils/prisma.js";
// const usersToUpdate = [
//   { id: 'cmeejjocz0000k0hzkdgrigdo', email: 'mohammad.dahamshi@gmail.com' },
//   { id: 'cmeejjocz0001k0hzfaz9xgo6', email: 'sarah.dahamshi@gmail.com' },
// ];
// async function main() {
// // for (const u of usersToUpdate) {
// //   await prisma.user.update({
// //     where: { id: u.id },
// //     data: { email: u.email },
// //   });
// // }
// const res = await prisma.user.findMany()
//   console.log(res)
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });




async function main() {
  // Find all users
  const users = await prisma.user.findMany();

  for (const user of users) {
    // Find their "Others" folder
    const others = await prisma.folder.findFirst({
      where: {
        name: "Others",
        userId: user.id,
      },
    });

    if (others) {
      console.log(`Setting root folder for user ${user.email} -> ${others.id}`);
      await prisma.user.update({
        where: { id: user.id },
        data: { rootFolderId: others.id },
      });
    } else {
      console.log(`⚠️ No "Others" folder for user ${user.email}, skipping...`);
    }
  }
}

main()
  .then(() => {
    console.log("Done setting root folders");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
