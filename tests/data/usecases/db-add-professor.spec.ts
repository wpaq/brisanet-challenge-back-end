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

  test('Should throw if AddProfessorRepository throws', async () => {
    const { sut, addProfessorRepositorySpy } = makeSut()
    jest.spyOn(addProfessorRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const addProfessorParams = mockAddProfessorParams()
    const promise = sut.add(addProfessorParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an professor on success', async () => {
    const { sut, addProfessorRepositorySpy } = makeSut()
    const addSpy = jest.spyOn(addProfessorRepositorySpy, 'add')
    await sut.add(mockAddProfessorParams())

    expect(addSpy).toHaveBeenCalledWith({
      nome: 'valid_nome',
      telefone: '123456789',
      email: 'valid_email@mail.com',
      cpf: '12345678910'
    })
  })
})
