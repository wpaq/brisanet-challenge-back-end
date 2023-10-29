import { CheckCadeirasAlunosByIdRepositorySpy, LoadAlunoByIdRepositorySpy, LoadProfessorByIdRepositorySpy, UpdateCadeirasAlunosRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateCadeirasAlunosParams } from '@/tests/domain'

import { DbUpdateCadeirasAlunos } from '@/data/usecases'
import { type CadeirasAlunosModel } from '@/domain/models'

type SutTypes = {
  sut: DbUpdateCadeirasAlunos
  updateCadeirasAlunosRepositorySpy: UpdateCadeirasAlunosRepositorySpy
  checkCadeirasAlunosByIdRepositorySpy: CheckCadeirasAlunosByIdRepositorySpy
  loadProfessorByIdRepositorySpy: LoadProfessorByIdRepositorySpy
  loadAlunoByIdRepositorySpy: LoadAlunoByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCadeirasAlunosRepositorySpy = new UpdateCadeirasAlunosRepositorySpy()
  const checkCadeirasAlunosByIdRepositorySpy = new CheckCadeirasAlunosByIdRepositorySpy()
  const loadProfessorByIdRepositorySpy = new LoadProfessorByIdRepositorySpy()
  const loadAlunoByIdRepositorySpy = new LoadAlunoByIdRepositorySpy()
  const sut = new DbUpdateCadeirasAlunos(updateCadeirasAlunosRepositorySpy, checkCadeirasAlunosByIdRepositorySpy, loadProfessorByIdRepositorySpy, loadAlunoByIdRepositorySpy)
  return {
    sut,
    updateCadeirasAlunosRepositorySpy,
    checkCadeirasAlunosByIdRepositorySpy,
    loadProfessorByIdRepositorySpy,
    loadAlunoByIdRepositorySpy
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

  test('Should call LoadProfessorByIdRepository with correct id', async () => {
    const { sut, loadProfessorByIdRepositorySpy } = makeSut()
    const result = await sut.update(mockUpdateCadeirasAlunosParams()) as CadeirasAlunosModel
    expect(loadProfessorByIdRepositorySpy.id).toBe(result.professorId)
  })

  test('Should throw if LoadProfessorByIdRepository throws', async () => {
    const { sut, loadProfessorByIdRepositorySpy } = makeSut()
    jest.spyOn(loadProfessorByIdRepositorySpy, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCadeirasAlunosParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadAlunoByIdRepository with correct id', async () => {
    const { sut, loadAlunoByIdRepositorySpy } = makeSut()
    const result = await sut.update(mockUpdateCadeirasAlunosParams()) as CadeirasAlunosModel
    expect(loadAlunoByIdRepositorySpy.id).toBe(result.alunoId)
  })

  test('Should throw if LoadAlunoByIdRepository throws', async () => {
    const { sut, loadAlunoByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAlunoByIdRepositorySpy, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCadeirasAlunosParams())
    await expect(promise).rejects.toThrow()
  })
})
