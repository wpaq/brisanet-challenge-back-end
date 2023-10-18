import { DbAddCadeira } from '@/data/usecases'
import { CheckProfessorByIdRepositorySpy } from '@/tests/data/mocks/mock-db-professor'
import { AddCadeiraRepositorySpy } from '@/tests/data/mocks/mock-db-cadeira'
import { mockAddCadeiraParams } from '@/tests/domain/mock-cadeira'

type SutTypes = {
  sut: DbAddCadeira
  addCadeiraRepositorySpy: AddCadeiraRepositorySpy
  checkProfessorByIdRepositorySpy: CheckProfessorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCadeiraRepositorySpy = new AddCadeiraRepositorySpy()
  const checkProfessorByIdRepositorySpy = new CheckProfessorByIdRepositorySpy()
  const sut = new DbAddCadeira(addCadeiraRepositorySpy, checkProfessorByIdRepositorySpy)
  return {
    sut,
    addCadeiraRepositorySpy,
    checkProfessorByIdRepositorySpy
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
})
