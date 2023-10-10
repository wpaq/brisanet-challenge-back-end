import { createProfessor } from './function-with-context'
import { type MockContext, type Context, createMockContext } from '@/tests/infra/db/prisma/context'
import { mockAddProfessorParams, mockProfessorModel } from '@/tests/domain/mock-professor'
import { PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'

describe('ProfessorPrismaRepository', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(async () => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    await PrismaHelper.deleteMany()
  })

  test('Should return an professor on success', async () => {
    const sut = new ProfessorPrismaRepository()
    const addProfessorParams = mockAddProfessorParams()
    const addProfessorModel = mockProfessorModel()
    const result = await sut.add(addProfessorParams)

    mockCtx.prisma.professor.create.mockResolvedValue(addProfessorModel)

    await expect(createProfessor(result, ctx)).resolves.toEqual({
      id: 'valid_id',
      nome: 'valid_nome',
      telefone: '123456789',
      email: 'valid_email@mail.com',
      cpf: '12345678910'
    })
  })
})
