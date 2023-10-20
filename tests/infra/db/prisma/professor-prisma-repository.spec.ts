import { mockAddProfessorParams } from '@/tests/domain'

import { PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'

import { faker } from '@faker-js/faker'

describe('ProfessorPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.disconnect('test')
  })
  describe('add()', () => {
    test('Should add an professor on success', async () => {
      const sut = new ProfessorPrismaRepository()
      await sut.add(mockAddProfessorParams())

      const count = await PrismaHelper.client.professor.count()
      expect(count).toBe(1)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email exists', async () => {
      const sut = new ProfessorPrismaRepository()
      const professor = await sut.add(mockAddProfessorParams())

      const emailExists = await sut.checkByEmail(professor.email)
      expect(emailExists).toBe(true)
    })

    test('Should return false if email not exists', async () => {
      const sut = new ProfessorPrismaRepository()

      const emailExists = await sut.checkByEmail(faker.internet.email())
      expect(emailExists).toBe(false)
    })
  })

  describe('checkById()', () => {
    test('Should return true if professor is valid', async () => {
      const sut = new ProfessorPrismaRepository()
      const professor = await sut.add(mockAddProfessorParams())

      const professorExists = await sut.checkById(professor.id)
      expect(professorExists).toBe(true)
    })

    test('Should return false if professor is not valid', async () => {
      const sut = new ProfessorPrismaRepository()

      const professorExists = await sut.checkById(faker.string.uuid())
      expect(professorExists).toBe(false)
    })
  })
})
