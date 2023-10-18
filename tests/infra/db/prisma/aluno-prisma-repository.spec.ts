import { PrismaHelper } from '@/infra/db/prisma'
import { mockAddAlunoParams } from '@/tests/domain/mock-aluno'
import { AlunoPrismaRepository } from '@/infra/db/prisma/aluno-prisma-repository'

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
