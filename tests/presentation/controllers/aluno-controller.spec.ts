import { AddAlunoSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { AlunoController } from '@/presentation/controllers'
import { badRequest, serverError } from '@/presentation/helpers'
import { MissingParamError } from '@/presentation/errors'

type SutTypes = {
  sut: AlunoController
  addAlunoSpy: AddAlunoSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addAlunoSpy = new AddAlunoSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AlunoController(addAlunoSpy, validationSpy)
  return {
    sut,
    addAlunoSpy,
    validationSpy
  }
}

describe('Aluno Controller', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
      }
    }
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError('any_field')
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddAluno with correct values', async () => {
    const { sut, addAlunoSpy } = makeSut()
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910,
        matricula: 'any_matricula'
      }
    }
    await sut.handle(httpRequest)
    expect(addAlunoSpy.addAlunoParams).toEqual({
      nome: 'any_nome',
      telefone: 123456789,
      email: 'any_email@mail.com',
      cpf: 12345678910,
      matricula: 'any_matricula'
    })
  })

  test('Should return 500 if AddAluno throws', async () => {
    const { sut, addAlunoSpy } = makeSut()
    jest.spyOn(addAlunoSpy, 'add').mockRejectedValueOnce(new Error())
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910,
        matricula: 'any_matricula'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addAlunoSpy } = makeSut()
    const httpRequest = {
      body: {
        nome: 'valid_nome',
        telefone: 123456789,
        email: 'valid_email@mail.com',
        cpf: 12345678910,
        matricula: 'valid_matricula'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(addAlunoSpy.alunoModel)
  })
})
