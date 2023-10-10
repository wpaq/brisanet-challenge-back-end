import { mockAddProfessorParams } from '@/tests/domain/mock-professor'
import { PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'

describe('ProfessorPrismaRepository', () => {
  beforeEach(async () => {
    await PrismaHelper.deleteMany()
  })

  test('Should return an professor on success', async () => {
    const sut = new ProfessorPrismaRepository()
    const addProfessorParams = mockAddProfessorParams()
    const result = await sut.add(addProfessorParams)

    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.nome).toBe('valid_nome')
    expect(result.telefone).toBe('123456789')
    expect(result.email).toBe('valid_email@mail.com')
    expect(result.cpf).toBe('12345678910')
  })
})
