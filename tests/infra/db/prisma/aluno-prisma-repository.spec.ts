import { mockAddAlunoParams } from '@/tests/domain'

import { PrismaHelper, AlunoPrismaRepository } from '@/infra/db/prisma'

describe('AlunoPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.aluno.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  test('Should add an aluno on success', async () => {
    const sut = new AlunoPrismaRepository()
    await sut.add(mockAddAlunoParams())

    const count = await PrismaHelper.client.aluno.count()
    expect(count).toBe(1)
  })
})
