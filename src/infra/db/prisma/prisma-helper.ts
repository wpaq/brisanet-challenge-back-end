import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const PrismaHelper = {
  prisma,

  async connect () {
    await prisma.$connect()
    return this.prisma
  },

  async disconnect () {
    await prisma.$disconnect()
  },

  async deleteMany () {
    await this.prisma.professor.deleteMany()
  }
}
