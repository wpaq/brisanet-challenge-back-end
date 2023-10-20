import { mockAddAlunoParams } from '@/tests/domain'

import { PrismaHelper, AlunoPrismaRepository } from '@/infra/db/prisma'
import { faker } from '@faker-js/faker'

describe('AlunoPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.aluno.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  describe('checkById()', () => {
    test('Should add an aluno on success', async () => {
      const sut = new AlunoPrismaRepository()
      await sut.add(mockAddAlunoParams())

      const count = await PrismaHelper.client.aluno.count()
      expect(count).toBe(1)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email exists', async () => {
      const sut = new AlunoPrismaRepository()
      const aluno = await sut.add(mockAddAlunoParams())

      const emailExists = await sut.checkByEmail(aluno.email)
      expect(emailExists).toBe(true)
    })

    test('Should return false if email not exists', async () => {
      const sut = new AlunoPrismaRepository()

      const emailExists = await sut.checkByEmail(faker.internet.email())
      expect(emailExists).toBe(false)
    })
  })
})
