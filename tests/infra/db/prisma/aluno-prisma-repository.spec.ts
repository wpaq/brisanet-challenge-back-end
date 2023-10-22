import { mockAddAlunoParams } from '@/tests/domain'

import { AlunoPrismaRepository, PrismaHelper } from '@/infra/db/prisma'

import { faker } from '@faker-js/faker'

const makeSut = (): AlunoPrismaRepository => {
  return new AlunoPrismaRepository()
}

describe('AlunoPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connectPrismock()
  })

  beforeEach(async () => {
    await PrismaHelper.client.aluno.deleteMany({})
  })

  afterAll(async () => {
    await PrismaHelper.disconnectPrismock()
  })

  describe('add()', () => {
    test('Should add an aluno on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddAlunoParams())

      const count = await PrismaHelper.client.aluno.count()
      expect(count).toBe(1)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email exists', async () => {
      const sut = makeSut()
      const aluno = await sut.add(mockAddAlunoParams())

      const emailExists = await sut.checkByEmail(aluno.email)
      expect(emailExists).toBe(true)
    })

    test('Should return false if email not exists', async () => {
      const sut = makeSut()

      const emailExists = await sut.checkByEmail(faker.internet.email())
      expect(emailExists).toBe(false)
    })
  })

  describe('checkById()', () => {
    test('Should return true if aluno is valid', async () => {
      const sut = makeSut()
      const aluno = await sut.add(mockAddAlunoParams())

      const alunoExists = await sut.checkById(aluno.id)
      expect(alunoExists).toBe(true)
    })

    test('Should return false if aluno is not valid', async () => {
      const sut = makeSut()

      const alunoExists = await sut.checkById(faker.string.uuid())
      expect(alunoExists).toBe(false)
    })
  })
})
