import { UpdateCadeirasAlunosRepositorySpy } from '@/tests/data/mocks'

import { DbUpdateCadeirasAlunos } from '@/data/usecases'
import { mockUpdateCadeirasAlunosParams } from '@/tests/domain'

type SutTypes = {
  sut: DbUpdateCadeirasAlunos
  updateCadeirasAlunosRepositorySpy: UpdateCadeirasAlunosRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCadeirasAlunosRepositorySpy = new UpdateCadeirasAlunosRepositorySpy()
  const sut = new DbUpdateCadeirasAlunos(updateCadeirasAlunosRepositorySpy)
  return {
    sut,
    updateCadeirasAlunosRepositorySpy
  }
}

describe('DbUpdateCadeirasAlunos Usecase', () => {
  test('Should call UpdateCadeirasAlunosRepository with correct data', async () => {
    const { sut, updateCadeirasAlunosRepositorySpy } = makeSut()
    const updateCadeirasAlunosParams = mockUpdateCadeirasAlunosParams()
    await sut.update(updateCadeirasAlunosParams)

    expect(updateCadeirasAlunosRepositorySpy.updateCadeirasAlunosParam).toEqual({
      id: updateCadeirasAlunosParams.id,
      statusMatricula: updateCadeirasAlunosParams.statusMatricula
    })
  })

  test('Should throw if UpdateCadeirasAlunosRepository throws', async () => {
    const { sut, updateCadeirasAlunosRepositorySpy } = makeSut()
    jest.spyOn(updateCadeirasAlunosRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCadeirasAlunosParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an cadeira aluno on success', async () => {
    const { sut, updateCadeirasAlunosRepositorySpy } = makeSut()
    const result = await sut.update(mockUpdateCadeirasAlunosParams())
    expect(result).toEqual(updateCadeirasAlunosRepositorySpy.result)
  })
})
