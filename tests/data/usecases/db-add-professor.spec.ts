import { mockAddProfessorParams, mockProfessorModel } from '@/tests/domain/mock-professor'
import { AddProfessorRepositorySpy } from '../mocks/mock-db-professor'
import { DbAddProfessor } from '@/data/usecases'
import { createMockContext, type Context, type MockContext } from '@/tests/infra/db/prisma/context'
import { createProfessor } from '@/tests/infra/db/prisma/function-with-context'
import { PrismaHelper } from '@/infra/db/prisma/prisma-helper'

type SutTypes = {
  sut: DbAddProfessor
  addProfessorRepositorySpy: AddProfessorRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProfessorRepositorySpy = new AddProfessorRepositorySpy()
  const sut = new DbAddProfessor(addProfessorRepositorySpy)
  return {
    sut,
    addProfessorRepositorySpy
  }
}

describe('DbAddProfessor Usecase', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(async () => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    await PrismaHelper.deleteMany()
  })

  test('Should call addProfessorParams with correct data', async () => {
    const { sut, addProfessorRepositorySpy } = makeSut()
    const addProfessorParams = mockAddProfessorParams()
    await sut.add(addProfessorParams)

    expect(addProfessorRepositorySpy.addProfessorParams).toEqual({
      nome: addProfessorParams.nome,
      telefone: addProfessorParams.telefone,
      email: addProfessorParams.email,
      cpf: addProfessorParams.cpf
    })
  })

  test('Should throw if AddProfessorRepository throws', async () => {
    const { sut, addProfessorRepositorySpy } = makeSut()
    jest.spyOn(addProfessorRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const addProfessorParams = mockAddProfessorParams()
    const promise = sut.add(addProfessorParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an professor on success', async () => {
    const { sut } = makeSut()
    const addProfessorModel = mockProfessorModel()
    const result = await sut.add(mockAddProfessorParams())

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
