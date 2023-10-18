import { mockAddProfessorParams } from '@/tests/domain'

import { PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'

describe('ProfessorPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  test('Should add an professor on success', async () => {
    const sut = new ProfessorPrismaRepository()
    await sut.add(mockAddProfessorParams())

    const count = await PrismaHelper.client.professor.count()
    expect(count).toBe(1)
  })
})
