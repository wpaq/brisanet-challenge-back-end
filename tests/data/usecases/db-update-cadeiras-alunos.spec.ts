import { CheckCadeirasAlunosByIdRepositorySpy, UpdateCadeirasAlunosRepositorySpy } from '@/tests/data/mocks'

import { DbUpdateCadeirasAlunos } from '@/data/usecases'
import { mockUpdateCadeirasAlunosParams } from '@/tests/domain'

type SutTypes = {
  sut: DbUpdateCadeirasAlunos
  updateCadeirasAlunosRepositorySpy: UpdateCadeirasAlunosRepositorySpy
  checkCadeirasAlunosByIdRepositorySpy: CheckCadeirasAlunosByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCadeirasAlunosRepositorySpy = new UpdateCadeirasAlunosRepositorySpy()
  const checkCadeirasAlunosByIdRepositorySpy = new CheckCadeirasAlunosByIdRepositorySpy()
  const sut = new DbUpdateCadeirasAlunos(updateCadeirasAlunosRepositorySpy, checkCadeirasAlunosByIdRepositorySpy)
  return {
    sut,
    updateCadeirasAlunosRepositorySpy,
    checkCadeirasAlunosByIdRepositorySpy
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

  test('Should return false if CheckCadeirasAlunosByIdRepository return false', async () => {
    const { sut, checkCadeirasAlunosByIdRepositorySpy } = makeSut()
    checkCadeirasAlunosByIdRepositorySpy.result = false
    const isValid = await sut.update(mockUpdateCadeirasAlunosParams())
    expect(isValid).toBe(false)
  })
})
