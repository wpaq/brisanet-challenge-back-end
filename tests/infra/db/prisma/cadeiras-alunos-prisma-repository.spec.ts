import { mockAddAlunoParams, mockAddCadeiraParams, mockAddProfessorParams } from '@/tests/domain'

import { PrismaHelper, CadeirasAlunosPrismaRepository, AlunoPrismaRepository, CadeiraPrismaRepository, ProfessorPrismaRepository } from '@/infra/db/prisma'

describe('CadeirasAlunosPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  beforeEach(async () => {
    await PrismaHelper.client.cadeirasAlunos.deleteMany({})
    await PrismaHelper.client.aluno.deleteMany({})
    await PrismaHelper.client.cadeira.deleteMany({})
  })

  afterAll(async () => {
    await PrismaHelper.client.cadeirasAlunos.deleteMany({})
    await PrismaHelper.client.aluno.deleteMany({})
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  describe('add()', () => {
    test('Should add an cadeiras alunos on success', async () => {
      const professor = await new ProfessorPrismaRepository().add(mockAddProfessorParams())
      const aluno = await new AlunoPrismaRepository().add(mockAddAlunoParams())
      const cadeira = await new CadeiraPrismaRepository().add(Object.assign({}, mockAddCadeiraParams(), { professorId: professor.id }))

      const sut = new CadeirasAlunosPrismaRepository()
      await sut.add({
        alunoId: aluno.id,
        cadeiraId: cadeira.id
      })

      const count = await PrismaHelper.client.cadeirasAlunos.count()
      expect(count).toBe(1)
    })
  })

  describe('countById()', () => {
    test('Should return count on success', async () => {
      const professor = await new ProfessorPrismaRepository().add(mockAddProfessorParams())
      const aluno = await new AlunoPrismaRepository().add(mockAddAlunoParams())
      const cadeira = await new CadeiraPrismaRepository().add(Object.assign({}, mockAddCadeiraParams(), { professorId: professor.id }))

      const sut = new CadeirasAlunosPrismaRepository()
      await sut.add({
        alunoId: aluno.id,
        cadeiraId: cadeira.id
      })

      const count = await sut.countById(aluno.id)
      expect(count).toBe(1)
    })
  })
})
