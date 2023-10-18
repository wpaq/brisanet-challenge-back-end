import { AddProfessorRepositorySpy, CheckProfessorByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAddProfessorParams } from '@/tests/domain'

import { DbAddProfessor } from '@/data/usecases'

type SutTypes = {
  sut: DbAddProfessor
  addProfessorRepositorySpy: AddProfessorRepositorySpy
  checkProfessorByEmailRepositorySpy: CheckProfessorByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProfessorRepositorySpy = new AddProfessorRepositorySpy()
  const checkProfessorByEmailRepositorySpy = new CheckProfessorByEmailRepositorySpy()
  const sut = new DbAddProfessor(addProfessorRepositorySpy, checkProfessorByEmailRepositorySpy)
  return {
    sut,
    addProfessorRepositorySpy,
    checkProfessorByEmailRepositorySpy
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

  test('Should return false if CheckProfessorByEmailRepository returns true', async () => {
    const { sut, checkProfessorByEmailRepositorySpy } = makeSut()
    checkProfessorByEmailRepositorySpy.result = true
    const isValid = await sut.add(mockAddProfessorParams())
    expect(isValid).toBe(false)
  })

  test('Should return an professor on success', async () => {
    const { sut, addProfessorRepositorySpy } = makeSut()
    const result = await sut.add(mockAddProfessorParams())
    expect(result).toEqual(addProfessorRepositorySpy.result)
  })
})
