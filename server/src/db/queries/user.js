import { prisma } from "../../utils/prisma.js";
const user = {
  getAll: async () => {
    return await prisma.user.findMany({
      orderBy: { id: "asc" },
    });
  },

  getById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  getByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  create: async (data) => {
    return await prisma.user.create({
      data,
    });
  },

  update: async (id, data) => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    await prisma.user.delete({
      where: { id },
    });
    return { deleted: id };
  },
};

export default user;
