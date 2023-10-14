import { LogPrismaRepository, PrismaHelper } from '@/infra/db/prisma'
import MockDate from 'mockdate'

const makeSut = (): LogPrismaRepository => {
  return new LogPrismaRepository()
}

describe('LogPrisma Repository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await PrismaHelper.client.logError.deleteMany({})
    await PrismaHelper.disconnect('test')
    MockDate.reset()
  })

  beforeEach(async () => {
    await PrismaHelper.client.logError.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_stack')

    const count = await PrismaHelper.client.logError.count()
    expect(count).toBe(1)
  })
})