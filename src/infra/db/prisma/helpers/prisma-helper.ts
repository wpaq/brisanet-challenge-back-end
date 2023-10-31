import { prisma } from './prisma-client'

export const PrismaHelper = {
  client: prisma,

  async connect (prisma) {
    await prisma.$connect()
    this.client = prisma
  },

  async disconnect (prisma) {
    await prisma.$disconnect()
  }
}
