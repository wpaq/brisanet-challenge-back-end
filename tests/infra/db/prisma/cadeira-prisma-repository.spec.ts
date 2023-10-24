import { mockAddProfessorParams, mockAddCadeiraParams } from '@/tests/domain'

import { CadeiraPrismaRepository, PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'
import { faker } from '@faker-js/faker'

let professorPrismaRepository: ProfessorPrismaRepository

const mockProfessorId = async (): Promise<string> => {
  const res = await professorPrismaRepository.add(mockAddProfessorParams())
  return res.id
}

const makeSut = (): CadeiraPrismaRepository => {
  return new CadeiraPrismaRepository()
}

describe('CadeiraPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connectPrismock()
  })

  beforeEach(async () => {
    professorPrismaRepository = new ProfessorPrismaRepository()
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.client.cadeira.deleteMany({})
  })

  afterAll(async () => {
    await PrismaHelper.disconnectPrismock()
  })

  describe('add()', () => {
    test('Should add an cadeira on success', async () => {
      const sut = makeSut()
      await sut.add(Object.assign({}, mockAddCadeiraParams(), { professorId: await mockProfessorId() }))

      const count = await PrismaHelper.client.cadeira.count()
      expect(count).toBe(1)
    })
  })

  describe('checkById()', () => {
    test('Should return true if cadeira is valid', async () => {
      const sut = makeSut()
      await sut.add(Object.assign({}, mockAddCadeiraParams(), { professorId: await mockProfessorId() }))
      const cadeira = await PrismaHelper.client.cadeira.findFirst()

      const cadeiraExists = await sut.checkById(cadeira?.id as string)
      expect(cadeiraExists).toBe(true)
    })

    test('Should return false if cadeira is not valid', async () => {
      const sut = makeSut()

      const cadeiraExists = await sut.checkById(faker.string.uuid())
      expect(cadeiraExists).toBe(false)
    })
  })

  describe('checkByPeriod()', () => {
    test('Should return true if period exists', async () => {
      const sut = makeSut()

      const addCadeiraParams = mockAddCadeiraParams()
      await sut.add(Object.assign({}, addCadeiraParams, { professorId: await mockProfessorId() }))

      const periodExists = await sut.checkByPeriod(addCadeiraParams.dataInicio, addCadeiraParams.dataFim)
      expect(periodExists).toBe(true)
    })

    test('Should return false if period not exists', async () => {
      const sut = makeSut()

      const periodExists = await sut.checkByPeriod(faker.date.recent(), faker.date.future({ years: 2 }))
      expect(periodExists).toBe(false)
    })
  })

  describe('loadAll()', () => {
    test('Should load all cadeiras on success', async () => {
      const sut = makeSut()
      await sut.add(Object.assign({}, mockAddCadeiraParams(), { professorId: await mockProfessorId() }))
      await sut.add(Object.assign({}, mockAddCadeiraParams(), { professorId: await mockProfessorId() }))

      const cadeiras = await sut.loadAll()
      expect(cadeiras.length).toBe(2)
      expect(cadeiras[0].id).toBeTruthy()
    })
  })

  describe('loadById()', () => {
    test('Should load an cadeira by id on success', async () => {
      const sut = makeSut()
      const res = await sut.add(Object.assign({}, mockAddCadeiraParams(), { professorId: await mockProfessorId() }))

      const cadeira = await sut.loadById(res.id)
      expect(cadeira).toBeTruthy()
      expect(cadeira.id).toBeTruthy()
    })
  })
})
