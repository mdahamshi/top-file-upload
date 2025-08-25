import { PrismaClient } from '@prisma/client';
const base = new PrismaClient();

const prisma = base.$extends({
  query: {
    user: {
      async create({ args, query }) {
        // 1. Create the user
        const user = await query(args);

        // 2. Create the root folder for this user
        const rootFolder = await prisma.folder.create({
          data: {
            name: 'Root',
            userId: user.id,
            parentId: null,
          },
        });

        // 3. Update the user with rootFolderId
        return prisma.user.update({
          where: { id: user.id },
          data: { rootFolderId: rootFolder.id },
        });
      },
    },
  },
});
export { prisma };
