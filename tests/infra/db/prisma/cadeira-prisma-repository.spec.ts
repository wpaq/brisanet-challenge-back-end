import { mockAddProfessorParams, mockAddCadeiraParams } from '@/tests/domain'

import { CadeiraPrismaRepository, PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'

describe('CadeiraPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  test('Should add an cadeira on success', async () => {
    const sut = new CadeiraPrismaRepository()
    const professorRepository = new ProfessorPrismaRepository()
    const professor = await professorRepository.add(mockAddProfessorParams())
    await sut.add(Object.assign({}, mockAddCadeiraParams(), { professorId: professor.id }))

    const count = await PrismaHelper.client.cadeira.count()
    expect(count).toBe(1)
  })
})
