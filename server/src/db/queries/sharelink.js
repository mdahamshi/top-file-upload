import { prisma } from '../../utils/prisma.js';

const shareLink = {
  getAll: async () => {
    return await prisma.shareLink.findMany({
      orderBy: { id: 'asc' },
    });
  },

  getById: async (id) => {
    return await prisma.shareLink.findUnique({
      where: { id },
    });
  },
  getByToken: async (token) => {
    return await prisma.shareLink.findUnique({
      where: { token },
      include: { folder: { include: { files: true, subfolders: true } } },
    });
  },

  create: async (data) => {
    return await prisma.shareLink.create({
      data,
    });
  },
  getByUser: async (userId) => {
    return await prisma.shareLink.findMany({
      where: {
        folder: {
          userId,
        },
      },
      include: {
        folder: true,
      },
    });
  },
  update: async (id, data) => {
    return await prisma.shareLink.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    await prisma.shareLink.delete({
      where: { id },
    });
    return { deleted: id };
  },
};

export default shareLink;
