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

  test('Should throw if AddAlunoRepository throws', async () => {
    const { sut, addAlunoRepositorySpy } = makeSut()
    jest.spyOn(addAlunoRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const addAlunoParams = mockAddAlunoParams()
    const promise = sut.add(addAlunoParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an aluno on success', async () => {
    const { sut, addAlunoRepositorySpy } = makeSut()
    const addSpy = jest.spyOn(addAlunoRepositorySpy, 'add')
    await sut.add(mockAddAlunoParams())

    expect(addSpy).toHaveBeenCalledWith({
      nome: 'valid_nome',
      telefone: '123456789',
      email: 'valid_email@mail.com',
      cpf: '12345678910',
      matricula: 'valid_matricula'
    })
  })
})
