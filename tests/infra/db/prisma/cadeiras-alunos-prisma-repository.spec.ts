import { mockAddAlunoParams, mockAddCadeiraParams, mockAddProfessorParams } from '@/tests/domain'

import { PrismaHelper, CadeirasAlunosPrismaRepository, AlunoPrismaRepository, CadeiraPrismaRepository, ProfessorPrismaRepository } from '@/infra/db/prisma'

let professorPrismaRepository: ProfessorPrismaRepository
let alunoPrismaRepository: AlunoPrismaRepository
let cadeiraPrismaRepository: CadeiraPrismaRepository

const mockProfessorId = async (): Promise<string> => {
  const res = await professorPrismaRepository.add(mockAddProfessorParams())
  return res.id
}

const mockAlunoId = async (): Promise<string> => {
  const res = await alunoPrismaRepository.add(mockAddAlunoParams())
  return res.id
}

const mockCadeiraId = async (): Promise<string> => {
  const res = await cadeiraPrismaRepository.add(Object.assign({}, mockAddCadeiraParams(), { professorId: await mockProfessorId() }))
  return res.id
}

const makeSut = (): CadeirasAlunosPrismaRepository => {
  return new CadeirasAlunosPrismaRepository()
}

describe('CadeirasAlunosPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  beforeEach(async () => {
    professorPrismaRepository = new ProfessorPrismaRepository()
    await PrismaHelper.client.professor.deleteMany({})
    alunoPrismaRepository = new AlunoPrismaRepository()
    await PrismaHelper.client.aluno.deleteMany({})
    cadeiraPrismaRepository = new CadeiraPrismaRepository()
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.client.cadeirasAlunos.deleteMany({})
  })

  afterAll(async () => {
    await PrismaHelper.disconnect('test')
  })

  describe('add()', () => {
    test('Should add an cadeiras alunos on success', async () => {
      const sut = makeSut()
      const alunoId: string = await mockAlunoId()
      const cadeiraId: string = await mockCadeiraId()

      await sut.add({
        alunoId,
        cadeiraId
      })

      const count = await PrismaHelper.client.cadeirasAlunos.count()
      expect(count).toBe(1)
    })
  })

  describe('countById()', () => {
    test('Should return count on success', async () => {
      const sut = new CadeirasAlunosPrismaRepository()
      const alunoId: string = await mockAlunoId()
      const cadeiraId: string = await mockCadeiraId()

      await sut.add({
        alunoId,
        cadeiraId
      })

      const count = await sut.countById(alunoId)
      expect(count).toBe(1)
    })
  })
})
