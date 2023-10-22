import { prisma } from './prisma-client'
import { prismock } from './prisma-mock'

export const PrismaHelper = {
  client: prismock || prisma,

  async connectPrismock () {
    await prismock.$connect()
    this.client = prismock
  },

  async disconnectPrismock () {
    await prismock.$disconnect()
  },

  async connect () {
    await prisma.$connect()
    this.client = prisma
  },

  async disconnect () {
    await prisma.$disconnect()
  }
}
