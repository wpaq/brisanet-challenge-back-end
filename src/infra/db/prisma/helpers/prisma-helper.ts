import { clientTest, clientProd } from './prisma-client'

export const PrismaHelper = {
  client: clientTest || clientProd,

  async connect (database: string) {
    if (database === 'test') {
      await clientTest.$connect()
      this.client = clientTest
      return this.client
    }

    if (database === 'prod') {
      await clientProd.$connect()
      this.client = clientProd
      return this.client
    }
  },

  async disconnect (database: string) {
    if (database === 'test') {
      await clientTest.$disconnect()
    }

    if (database === 'prod') {
      await clientProd.$disconnect()
    }
  }
}
