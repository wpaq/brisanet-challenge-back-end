import { mockAddProfessorParams } from '@/tests/domain/mock-professor'
import { PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'

describe('ProfessorPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  beforeEach(async () => {
    await PrismaHelper.client.professor.deleteMany({})
  })

  test('Should return an professor on success', async () => {
    const sut = new ProfessorPrismaRepository()
    const addProfessorParams = mockAddProfessorParams()
    const result = await sut.add(addProfessorParams)

    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.nome).toBe(addProfessorParams.nome)
    expect(result.telefone).toBe(addProfessorParams.telefone)
    expect(result.email).toBe(addProfessorParams.email)
    expect(result.cpf).toBe(addProfessorParams.cpf)
  })
})
