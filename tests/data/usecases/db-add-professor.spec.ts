import { mockAddProfessorParams } from '@/tests/domain/mock-professor'
import { AddProfessorRepositorySpy } from '../mocks/mock-db-professor'
import { DbAddProfessor } from '@/data/usecases'

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
  test('Should call AddProfessorRepository with correct data', async () => {
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
})
