import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

// Add this function to export
const query = async (sql: string, params?: any[]) => {
  try {
    return await prisma.$queryRawUnsafe(sql, ...(params || []));
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

export { prisma, query }