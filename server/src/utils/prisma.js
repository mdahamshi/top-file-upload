import { PrismaClient } from '@prisma/client';
const base = new PrismaClient();

const prisma = base.$extends({
  query: {
    file: {
      async create({ args, query }) {

        if (!args.data.folderId) {
          let others = await base.folder.findFirst({
            where: { name: "Others", userId: args.data.ownerId },
          });

          if (!others) {
            others = await base.folder.create({
              data: { name: "Others", userId: args.data.ownerId },
            });
          }

          args.data.folderId = others.id;
        }

        return query(args);
      },
    },
  },
});
export { prisma };
