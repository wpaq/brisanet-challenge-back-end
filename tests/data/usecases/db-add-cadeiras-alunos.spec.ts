import { mockAddCadeirasAlunosParams } from '@/tests/domain'
import { AddCadeirasAlunosRepositorySpy } from '@/tests/data/mocks'

import { DbAddCadeirasAlunos } from '@/data/usecases'

type SutTypes = {
  sut: DbAddCadeirasAlunos
  addCadeirasAlunosRepositorySpy: AddCadeirasAlunosRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCadeirasAlunosRepositorySpy = new AddCadeirasAlunosRepositorySpy()
  const sut = new DbAddCadeirasAlunos(addCadeirasAlunosRepositorySpy)
  return {
    sut,
    addCadeirasAlunosRepositorySpy
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
})
