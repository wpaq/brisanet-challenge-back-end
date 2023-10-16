import { LogPrismaRepository, PrismaHelper } from '@/infra/db/prisma'

import { faker } from '@faker-js/faker'

const makeSut = (): LogPrismaRepository => {
  return new LogPrismaRepository()
}

describe('LogPrisma Repository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.logError.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  beforeEach(async () => {
    await PrismaHelper.client.logError.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.word.words())

    const count = await PrismaHelper.client.logError.count()
    expect(count).toBe(1)
  })
})
