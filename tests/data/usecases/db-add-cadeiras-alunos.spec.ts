import { mockAddCadeirasAlunosParams } from '@/tests/domain'
import { AddCadeirasAlunosRepositorySpy, CheckAlunoByIdRepositorySpy } from '@/tests/data/mocks'

import { DbAddCadeirasAlunos } from '@/data/usecases'

type SutTypes = {
  sut: DbAddCadeirasAlunos
  addCadeirasAlunosRepositorySpy: AddCadeirasAlunosRepositorySpy
  checkAlunoByIdRepositorySpy: CheckAlunoByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCadeirasAlunosRepositorySpy = new AddCadeirasAlunosRepositorySpy()
  const checkAlunoByIdRepositorySpy = new CheckAlunoByIdRepositorySpy()
  const sut = new DbAddCadeirasAlunos(addCadeirasAlunosRepositorySpy, checkAlunoByIdRepositorySpy)
  return {
    sut,
    addCadeirasAlunosRepositorySpy,
    checkAlunoByIdRepositorySpy
  }
}

describe('DbAddCadeirasAlunos Usecase', () => {
  test('Should call AddCadeirasAlunosRepository with correct data', async () => {
    const { sut, addCadeirasAlunosRepositorySpy } = makeSut()
    const addCadeirasAlunosParams = mockAddCadeirasAlunosParams()
    await sut.add(addCadeirasAlunosParams)

    expect(addCadeirasAlunosRepositorySpy.addCadeirasAlunosParams).toEqual({
      alunoId: addCadeirasAlunosParams.alunoId,
      cadeiraId: addCadeirasAlunosParams.cadeiraId
    })
  })

  test('Should throw if AddCadeirasAlunosRepository throws', async () => {
    const { sut, addCadeirasAlunosRepositorySpy } = makeSut()
    jest.spyOn(addCadeirasAlunosRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddCadeirasAlunosParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an cadeiras alunos on success', async () => {
    const { sut, addCadeirasAlunosRepositorySpy } = makeSut()
    const result = await sut.add(mockAddCadeirasAlunosParams())
    expect(result).toEqual(addCadeirasAlunosRepositorySpy.result)
  })

  test('Should return false if CheckAlunoByIdRepository returns false', async () => {
    const { sut, checkAlunoByIdRepositorySpy } = makeSut()
    checkAlunoByIdRepositorySpy.result = false
    const isValid = await sut.add(mockAddCadeirasAlunosParams())
    expect(isValid).toBe(false)
  })
})
