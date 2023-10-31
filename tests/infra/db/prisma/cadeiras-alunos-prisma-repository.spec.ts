import { mockAddAlunoParams, mockAddCadeiraParams, mockAddCadeirasAlunosParams, mockAddProfessorParams } from '@/tests/domain'
import { prismock } from '@/tests/infra/db/mocks'

import { PrismaHelper, CadeirasAlunosPrismaRepository, AlunoPrismaRepository, CadeiraPrismaRepository, ProfessorPrismaRepository } from '@/infra/db/prisma'

import { faker } from '@faker-js/faker'

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
    await PrismaHelper.connect(prismock)
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
    await PrismaHelper.disconnect(prismock)
  })

  describe('add()', () => {
    test('Should add an cadeiras alunos on success', async () => {
      const sut = makeSut()
      const alunoId: string = await mockAlunoId()
      const cadeiraId: string = await mockCadeiraId()
      const professorId: string = await mockProfessorId()

      await sut.add({
        alunoId,
        cadeiraId,
        professorId
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
      const professorId: string = await mockProfessorId()

      await sut.add({
        alunoId,
        cadeiraId,
        professorId
      })

      const count = await sut.countById(alunoId, cadeiraId)
      expect(count).toBe(1)
    })
  })

  describe('countByAlunoId()', () => {
    test('Should return count on success', async () => {
      const sut = new CadeirasAlunosPrismaRepository()
      const alunoId: string = await mockAlunoId()
      const cadeiraId: string = await mockCadeiraId()
      const professorId: string = await mockProfessorId()

      await sut.add({
        alunoId,
        cadeiraId,
        professorId
      })

      const count = await sut.countByAlunoId(alunoId)
      expect(count).toBe(1)
    })
  })

  describe('update()', () => {
    test('Should return an cadeiras alunos on success', async () => {
      const sut = new CadeirasAlunosPrismaRepository()
      const alunoId: string = await mockAlunoId()
      const cadeiraId: string = await mockCadeiraId()
      const professorId: string = await mockProfessorId()

      const res = await sut.add({
        alunoId,
        cadeiraId,
        professorId
      })

      const updatedCadeirasAlunos = await sut.update({
        id: res.id,
        statusMatricula: 'Aprovado'
      })

      expect(updatedCadeirasAlunos.id).toBeTruthy()
      expect(updatedCadeirasAlunos.statusMatricula).toBe('Aprovado')
    })
  })

  describe('checkById()', () => {
    test('Should return true if cadeira aluno is valid', async () => {
      const sut = makeSut()
      const cadeiraAluno = await sut.add(mockAddCadeirasAlunosParams())

      const cadeiraAlunoExists = await sut.checkById(cadeiraAluno.id)
      expect(cadeiraAlunoExists).toBe(true)
    })

    test('Should return false if cadeiraAluno is not valid', async () => {
      const sut = makeSut()

      const cadeiraAlunoExists = await sut.checkById(faker.string.uuid())
      expect(cadeiraAlunoExists).toBe(false)
    })
  })
})
