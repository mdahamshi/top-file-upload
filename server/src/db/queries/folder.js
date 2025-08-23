import { prisma } from "../../utils/prisma.js";
const folder = {
  getAll: async () => {
    return await prisma.folder.findMany({
      orderBy: { id: "asc" },
    });
  },

  getById: async (id) => {
    return await prisma.folder.findUnique({
      where: { id },
      include: { subfolders: true, files: true },
    });
  },
  getByMe: async (userId) => {
    return await prisma.folder.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
  create: async (data) => {
    return await prisma.folder.create({
      data,
    });
  },

  update: async (id, data) => {
    return await prisma.folder.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    await prisma.folder.delete({
      where: { id },
    });
    return { deleted: id };
  },
};

export default folder;
