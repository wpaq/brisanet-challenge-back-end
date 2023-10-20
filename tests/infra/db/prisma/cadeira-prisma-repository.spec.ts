import { mockAddProfessorParams, mockAddCadeiraParams } from '@/tests/domain'

import { CadeiraPrismaRepository, PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'
import { faker } from '@faker-js/faker'

describe('CadeiraPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  beforeEach(async () => {
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.client.professor.deleteMany({})
  })

  afterAll(async () => {
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  describe('add()', () => {
    test('Should add an cadeira on success', async () => {
      const sut = new CadeiraPrismaRepository()
      const professorRepository = new ProfessorPrismaRepository()
      const professor = await professorRepository.add(mockAddProfessorParams())
      await sut.add(Object.assign({}, mockAddCadeiraParams(), { professorId: professor.id }))

      const count = await PrismaHelper.client.cadeira.count()
      expect(count).toBe(1)
    })
  })

  describe('checkById()', () => {
    test('Should return true if cadeira is valid', async () => {
      const sut = new CadeiraPrismaRepository()
      const professor = await new ProfessorPrismaRepository().add(mockAddProfessorParams())

      await sut.add(Object.assign({}, mockAddCadeiraParams(), { professorId: professor.id }))
      const cadeira = await PrismaHelper.client.cadeira.findFirst()

      const cadeiraExists = await sut.checkById(cadeira?.id as string)
      expect(cadeiraExists).toBe(true)
    })

    test('Should return false if cadeira is not valid', async () => {
      const sut = new CadeiraPrismaRepository()

      const cadeiraExists = await sut.checkById(faker.string.uuid())
      expect(cadeiraExists).toBe(false)
    })
  })

  describe('checkByPeriod()', () => {
    test('Should return true if period exists', async () => {
      const sut = new CadeiraPrismaRepository()
      const professor = await new ProfessorPrismaRepository().add(mockAddProfessorParams())

      const addCadeiraParams = mockAddCadeiraParams()
      await sut.add(Object.assign({}, addCadeiraParams, { professorId: professor.id }))

      const periodExists = await sut.checkByPeriod(addCadeiraParams.dataInicio, addCadeiraParams.dataFim)
      expect(periodExists).toBe(true)
    })
  })
})
