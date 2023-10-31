import { CheckCadeirasAlunosByIdRepositorySpy, EmailNotificationSpy, LoadAlunoByIdRepositorySpy, LoadCadeiraByIdRepositorySpy, LoadProfessorByIdRepositorySpy, UpdateCadeirasAlunosRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateCadeirasAlunosParams } from '@/tests/domain'

import { DbUpdateCadeirasAlunos } from '@/data/usecases'

type SutTypes = {
  sut: DbUpdateCadeirasAlunos
  updateCadeirasAlunosRepositorySpy: UpdateCadeirasAlunosRepositorySpy
  checkCadeirasAlunosByIdRepositorySpy: CheckCadeirasAlunosByIdRepositorySpy
  loadProfessorByIdRepositorySpy: LoadProfessorByIdRepositorySpy
  loadAlunoByIdRepositorySpy: LoadAlunoByIdRepositorySpy
  emailNotificationSpy: EmailNotificationSpy
  loadCadeiraByIdRepositorySpy: LoadCadeiraByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCadeirasAlunosRepositorySpy = new UpdateCadeirasAlunosRepositorySpy()
  const checkCadeirasAlunosByIdRepositorySpy = new CheckCadeirasAlunosByIdRepositorySpy()
  const loadProfessorByIdRepositorySpy = new LoadProfessorByIdRepositorySpy()
  const loadAlunoByIdRepositorySpy = new LoadAlunoByIdRepositorySpy()
  const emailNotificationSpy = new EmailNotificationSpy()
  const loadCadeiraByIdRepositorySpy = new LoadCadeiraByIdRepositorySpy()
  const sut = new DbUpdateCadeirasAlunos(updateCadeirasAlunosRepositorySpy, checkCadeirasAlunosByIdRepositorySpy, loadProfessorByIdRepositorySpy, loadAlunoByIdRepositorySpy, emailNotificationSpy, loadCadeiraByIdRepositorySpy)
  return {
    sut,
    updateCadeirasAlunosRepositorySpy,
    checkCadeirasAlunosByIdRepositorySpy,
    loadProfessorByIdRepositorySpy,
    loadAlunoByIdRepositorySpy,
    emailNotificationSpy,
    loadCadeiraByIdRepositorySpy
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

  test('Should call LoadCadeiraByIdRepository with correct id', async () => {
    const { sut, loadCadeiraByIdRepositorySpy, updateCadeirasAlunosRepositorySpy } = makeSut()
    await sut.update(mockUpdateCadeirasAlunosParams())
    expect(loadCadeiraByIdRepositorySpy.id).toBe(updateCadeirasAlunosRepositorySpy.result.cadeiraId)
  })

  test('Should call EmailNotification with correct values', async () => {
    const { sut, emailNotificationSpy, loadProfessorByIdRepositorySpy, loadAlunoByIdRepositorySpy } = makeSut()
    await sut.update(mockUpdateCadeirasAlunosParams())
    expect(emailNotificationSpy.receiverEmail).toBe(loadAlunoByIdRepositorySpy.result.email)
    expect(emailNotificationSpy.senderEmail).toBe(loadProfessorByIdRepositorySpy.result.email)
    expect(emailNotificationSpy.senderName).toBe(loadProfessorByIdRepositorySpy.result.nome)
  })

  test('Should return false if EmailNotification returns false', async () => {
    const { sut, emailNotificationSpy } = makeSut()
    emailNotificationSpy.result = false
    const isValid = await sut.update(mockUpdateCadeirasAlunosParams())
    expect(isValid).toBe(false)
  })

  test('Should throw if EmailNotification throws', async () => {
    const { sut, emailNotificationSpy } = makeSut()
    jest.spyOn(emailNotificationSpy, 'send').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCadeirasAlunosParams())
    await expect(promise).rejects.toThrow()
  })
})
