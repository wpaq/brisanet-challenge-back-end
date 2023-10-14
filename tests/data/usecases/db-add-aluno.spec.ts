import { DbAddAluno } from '@/data/usecases'
import { AddAlunoRepositorySpy } from '@/tests/data/mocks/mock-db-aluno'
import { mockAddAlunoParams } from '@/tests/domain/mock-aluno'

type SutTypes = {
  sut: DbAddAluno
  addAlunoRepositorySpy: AddAlunoRepositorySpy
}

const makeSut = (): SutTypes => {
  const addAlunoRepositorySpy = new AddAlunoRepositorySpy()
  const sut = new DbAddAluno(addAlunoRepositorySpy)
  return {
    sut,
    addAlunoRepositorySpy
  }
}

describe('DbAddAluno Usecase', () => {
  test('Should call AddAlunoRepository with correct data', async () => {
    const { sut, addAlunoRepositorySpy } = makeSut()
    const addAlunoParams = mockAddAlunoParams()
    await sut.add(addAlunoParams)

    expect(addAlunoRepositorySpy.addAlunoParams).toEqual({
      nome: addAlunoParams.nome,
      telefone: addAlunoParams.telefone,
      email: addAlunoParams.email,
      cpf: addAlunoParams.cpf,
      matricula: addAlunoParams.matricula
    })
  })
})
