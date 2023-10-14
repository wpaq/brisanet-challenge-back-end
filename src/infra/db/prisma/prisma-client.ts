import { PrismaClient } from '@prisma/client'

const clientProd = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:admin@localhost:5432/brisanet_challenger?schema=public'
    }
  }
})
const clientTest = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:admin@localhost:5432/brisanet_challenger_tests?schema=public'
    }
  }
})

export {
  clientProd,
  clientTest
}
