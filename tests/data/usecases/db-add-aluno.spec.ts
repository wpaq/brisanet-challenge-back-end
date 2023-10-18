import { mockAddAlunoParams } from '@/tests/domain/mock-aluno'
import { AddAlunoRepositorySpy, CheckAlunoByEmailRepositorySpy } from '@/tests/data/mocks/mock-db-aluno'
import { DbAddAluno } from '@/data/usecases'

type SutTypes = {
  sut: DbAddAluno
  addAlunoRepositorySpy: AddAlunoRepositorySpy
  checkAlunoByEmailRepositorySpy: CheckAlunoByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const addAlunoRepositorySpy = new AddAlunoRepositorySpy()
  const checkAlunoByEmailRepositorySpy = new CheckAlunoByEmailRepositorySpy()
  const sut = new DbAddAluno(addAlunoRepositorySpy, checkAlunoByEmailRepositorySpy)
  return {
    sut,
    addAlunoRepositorySpy,
    checkAlunoByEmailRepositorySpy
  }
}

describe('DbAddAluno Usecase', () => {
  test('Should call AddAlunoRepository with correct data', async () => {
    const { sut, addAlunoRepositorySpy } = makeSut()
    const addAlunoParams = mockAddAlunoParams()
    await sut.add(addAlunoParams)

    expect(addAlunoRepositorySpy.addAlunoParams).toEqual({
      nome: addAlunoParams.nome,
      telefone: addAlunoParams.telefone,
      email: addAlunoParams.email,
      cpf: addAlunoParams.cpf,
      matricula: addAlunoParams.matricula
    })
  })

  test('Should throw if AddAlunoRepository throws', async () => {
    const { sut, addAlunoRepositorySpy } = makeSut()
    jest.spyOn(addAlunoRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const addAlunoParams = mockAddAlunoParams()
    const promise = sut.add(addAlunoParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if CheckAlunoByEmailRepository returns true', async () => {
    const { sut, checkAlunoByEmailRepositorySpy } = makeSut()
    checkAlunoByEmailRepositorySpy.result = true
    const isValid = await sut.add(mockAddAlunoParams())
    expect(isValid).toBe(false)
  })

  test('Should return an aluno on success', async () => {
    const { sut, addAlunoRepositorySpy } = makeSut()
    const result = await sut.add(mockAddAlunoParams())
    expect(result).toEqual(addAlunoRepositorySpy.result)
  })
})
