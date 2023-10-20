import { CheckProfessorByIdRepositorySpy, AddCadeiraRepositorySpy, CheckCadeiraByPeriodRepositorySpy } from '@/tests/data/mocks'
import { mockAddCadeiraParams } from '@/tests/domain'

import { DbAddCadeira } from '@/data/usecases'

type SutTypes = {
  sut: DbAddCadeira
  addCadeiraRepositorySpy: AddCadeiraRepositorySpy
  checkProfessorByIdRepositorySpy: CheckProfessorByIdRepositorySpy
  checkCadeiraByPeriodRepositorySpy: CheckCadeiraByPeriodRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCadeiraRepositorySpy = new AddCadeiraRepositorySpy()
  const checkProfessorByIdRepositorySpy = new CheckProfessorByIdRepositorySpy()
  const checkCadeiraByPeriodRepositorySpy = new CheckCadeiraByPeriodRepositorySpy()
  const sut = new DbAddCadeira(addCadeiraRepositorySpy, checkProfessorByIdRepositorySpy, checkCadeiraByPeriodRepositorySpy)
  return {
    sut,
    addCadeiraRepositorySpy,
    checkProfessorByIdRepositorySpy,
    checkCadeiraByPeriodRepositorySpy
  }
}

describe('DbAddCadeira Usecase', () => {
  test('Should call AddCadeiraRepository with correct data', async () => {
    const { sut, addCadeiraRepositorySpy } = makeSut()
    const addCadeiraParams = mockAddCadeiraParams()
    await sut.add(addCadeiraParams)

    expect(addCadeiraRepositorySpy.addCadeiraParams).toEqual({
      nome: addCadeiraParams.nome,
      slug: addCadeiraParams.slug,
      dataInicio: addCadeiraParams.dataInicio,
      dataFim: addCadeiraParams.dataFim,
      cargaHoraria: addCadeiraParams.cargaHoraria,
      professorId: addCadeiraParams.professorId
    })
  })

  test('Should throw if AddCadeiraRepository throws', async () => {
    const { sut, addCadeiraRepositorySpy } = makeSut()
    jest.spyOn(addCadeiraRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddCadeiraParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an cadeira on success', async () => {
    const { sut, addCadeiraRepositorySpy } = makeSut()
    const result = await sut.add(mockAddCadeiraParams())
    expect(result).toEqual(addCadeiraRepositorySpy.result)
  })

  test('Should return false if CheckProfessorByIdRepository returns false', async () => {
    const { sut, checkProfessorByIdRepositorySpy } = makeSut()
    checkProfessorByIdRepositorySpy.result = false
    const isValid = await sut.add(mockAddCadeiraParams())
    expect(isValid).toBe(false)
  })

  test('Should return false if CheckCadeiraByPeriodRepository returns true', async () => {
    const { sut, checkCadeiraByPeriodRepositorySpy } = makeSut()
    checkCadeiraByPeriodRepositorySpy.result = true
    const isValid = await sut.add(mockAddCadeiraParams())
    expect(isValid).toBe(false)
  })
})
