import { mockAddCadeiraParams } from '@/tests/domain/mock-cadeira'
import { AddCadeiraRepositorySpy } from '@/tests/data/mocks/mock-db-cadeira'
import { DbAddCadeira } from '@/data/usecases'

type SutTypes = {
  sut: DbAddCadeira
  addCadeiraRepositorySpy: AddCadeiraRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCadeiraRepositorySpy = new AddCadeiraRepositorySpy()
  const sut = new DbAddCadeira(addCadeiraRepositorySpy)
  return {
    sut,
    addCadeiraRepositorySpy
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
      data_inicio: addCadeiraParams.data_inicio,
      data_fim: addCadeiraParams.data_fim,
      carga_horaria: addCadeiraParams.carga_horaria,
      professor_id: addCadeiraParams.professor_id
    })
  })
})
