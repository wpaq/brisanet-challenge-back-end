import { CheckCadeirasAlunosByIdRepositorySpy, EmailNotificationSpy, LoadAlunoByIdRepositorySpy, LoadProfessorByIdRepositorySpy, UpdateCadeirasAlunosRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateCadeirasAlunosParams } from '@/tests/domain'

import { DbUpdateCadeirasAlunos } from '@/data/usecases'

type SutTypes = {
  sut: DbUpdateCadeirasAlunos
  updateCadeirasAlunosRepositorySpy: UpdateCadeirasAlunosRepositorySpy
  checkCadeirasAlunosByIdRepositorySpy: CheckCadeirasAlunosByIdRepositorySpy
  loadProfessorByIdRepositorySpy: LoadProfessorByIdRepositorySpy
  loadAlunoByIdRepositorySpy: LoadAlunoByIdRepositorySpy
  emailNotificationSpy: EmailNotificationSpy
}

const makeSut = (): SutTypes => {
  const updateCadeirasAlunosRepositorySpy = new UpdateCadeirasAlunosRepositorySpy()
  const checkCadeirasAlunosByIdRepositorySpy = new CheckCadeirasAlunosByIdRepositorySpy()
  const loadProfessorByIdRepositorySpy = new LoadProfessorByIdRepositorySpy()
  const loadAlunoByIdRepositorySpy = new LoadAlunoByIdRepositorySpy()
  const emailNotificationSpy = new EmailNotificationSpy()
  const sut = new DbUpdateCadeirasAlunos(updateCadeirasAlunosRepositorySpy, checkCadeirasAlunosByIdRepositorySpy, loadProfessorByIdRepositorySpy, loadAlunoByIdRepositorySpy, emailNotificationSpy)
  return {
    sut,
    updateCadeirasAlunosRepositorySpy,
    checkCadeirasAlunosByIdRepositorySpy,
    loadProfessorByIdRepositorySpy,
    loadAlunoByIdRepositorySpy,
    emailNotificationSpy
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
    const { sut, loadProfessorByIdRepositorySpy, updateCadeirasAlunosRepositorySpy } = makeSut()
    await sut.update(mockUpdateCadeirasAlunosParams())
    expect(loadProfessorByIdRepositorySpy.id).toBe(updateCadeirasAlunosRepositorySpy.result.professorId)
  })

  test('Should throw if LoadProfessorByIdRepository throws', async () => {
    const { sut, loadProfessorByIdRepositorySpy } = makeSut()
    jest.spyOn(loadProfessorByIdRepositorySpy, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCadeirasAlunosParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadAlunoByIdRepository with correct id', async () => {
    const { sut, loadAlunoByIdRepositorySpy, updateCadeirasAlunosRepositorySpy } = makeSut()
    await sut.update(mockUpdateCadeirasAlunosParams())
    expect(loadAlunoByIdRepositorySpy.id).toBe(updateCadeirasAlunosRepositorySpy.result.alunoId)
  })

  test('Should throw if LoadAlunoByIdRepository throws', async () => {
    const { sut, loadAlunoByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAlunoByIdRepositorySpy, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCadeirasAlunosParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if EmailNotification returns false', async () => {
    const { sut, emailNotificationSpy } = makeSut()
    emailNotificationSpy.result = false
    const isValid = await sut.update(mockUpdateCadeirasAlunosParams())
    expect(isValid).toBe(false)
  })
})
