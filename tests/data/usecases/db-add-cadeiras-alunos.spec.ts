import { mockAddCadeirasAlunosParams } from '@/tests/domain'
import { AddCadeirasAlunosRepositorySpy, CheckAlunoByIdRepositorySpy, CheckCadeiraByIdRepositorySpy, CountCadeirasAlunosByIdRepositorySpy } from '@/tests/data/mocks'

import { DbAddCadeirasAlunos } from '@/data/usecases'

type SutTypes = {
  sut: DbAddCadeirasAlunos
  addCadeirasAlunosRepositorySpy: AddCadeirasAlunosRepositorySpy
  checkAlunoByIdRepositorySpy: CheckAlunoByIdRepositorySpy
  checkCadeiraByIdRepositorySpy: CheckCadeiraByIdRepositorySpy
  countCadeirasAlunosByIdRepositorySpy: CountCadeirasAlunosByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCadeirasAlunosRepositorySpy = new AddCadeirasAlunosRepositorySpy()
  const checkAlunoByIdRepositorySpy = new CheckAlunoByIdRepositorySpy()
  const checkCadeiraByIdRepositorySpy = new CheckCadeiraByIdRepositorySpy()
  const countCadeirasAlunosByIdRepositorySpy = new CountCadeirasAlunosByIdRepositorySpy()
  const sut = new DbAddCadeirasAlunos(addCadeirasAlunosRepositorySpy, checkAlunoByIdRepositorySpy, checkCadeiraByIdRepositorySpy, countCadeirasAlunosByIdRepositorySpy)
  return {
    sut,
    addCadeirasAlunosRepositorySpy,
    checkAlunoByIdRepositorySpy,
    checkCadeiraByIdRepositorySpy,
    countCadeirasAlunosByIdRepositorySpy
  }
}

describe('DbAddCadeirasAlunos Usecase', () => {
  test('Should call AddCadeirasAlunosRepository with correct data', async () => {
    const { sut, addCadeirasAlunosRepositorySpy } = makeSut()
    const addCadeirasAlunosParams = mockAddCadeirasAlunosParams()
    await sut.add(addCadeirasAlunosParams)

    expect(addCadeirasAlunosRepositorySpy.addCadeirasAlunosParams.alunoId).toEqual(addCadeirasAlunosParams.alunoId)
    expect(addCadeirasAlunosRepositorySpy.addCadeirasAlunosParams.cadeiraId).toEqual(addCadeirasAlunosParams.cadeiraId)
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

  test('Should return false if CheckCadeiraByIdRepository returns false', async () => {
    const { sut, checkCadeiraByIdRepositorySpy } = makeSut()
    checkCadeiraByIdRepositorySpy.result = false
    const isValid = await sut.add(mockAddCadeirasAlunosParams())
    expect(isValid).toBe(false)
  })

  test('Should return false if CountCadeirasAlunosByIdRepository.countByAlunoId returns 8', async () => {
    const { sut, countCadeirasAlunosByIdRepositorySpy } = makeSut()
    countCadeirasAlunosByIdRepositorySpy.result = 8
    const isValid = await sut.add(mockAddCadeirasAlunosParams())
    expect(isValid).toBe(false)
  })

  test('Should return false if CountCadeirasAlunosByIdRepository.countById returns 1', async () => {
    const { sut, countCadeirasAlunosByIdRepositorySpy } = makeSut()
    countCadeirasAlunosByIdRepositorySpy.result = 1
    const isValid = await sut.add(mockAddCadeirasAlunosParams())
    expect(isValid).toBe(false)
  })
})
