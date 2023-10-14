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

  beforeEach(async () => {
    await PrismaHelper.client.aluno.deleteMany({})
  })

  test('Should return an aluno on success', async () => {
    const sut = new AlunoPrismaRepository()
    const addAlunoParams = mockAddAlunoParams()
    const result = await sut.add(addAlunoParams)

    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.nome).toBe(addAlunoParams.nome)
    expect(result.telefone).toBe(addAlunoParams.telefone)
    expect(result.email).toBe(addAlunoParams.email)
    expect(result.cpf).toBe(addAlunoParams.cpf)
    expect(result.matricula).toBe(addAlunoParams.matricula)
  })
})
