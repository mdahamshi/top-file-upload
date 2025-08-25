import { prisma } from '../../utils/prisma.js';

const file = {
  getAll: async () => {
    return await prisma.file.findMany({
      orderBy: { id: 'asc' },
    });
  },

  getById: async (id) => {
    return await prisma.file.findUnique({
      where: { id },
    });
  },

  create: async (data) => {
    return await prisma.file.create({
      data,
    });
  },

  update: async (id, data) => {
    return await prisma.file.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    await prisma.file.delete({
      where: { id },
    });
    return { deleted: id };
  },
};

export default file;
