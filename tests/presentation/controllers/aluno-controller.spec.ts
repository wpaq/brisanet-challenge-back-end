import { AlunoController } from '@/presentation/controllers'
import { AddAlunoSpy, EmailValidatorSpy } from '@/tests/presentation/mocks'
import { badRequest, serverError } from '@/presentation/helpers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'

type SutTypes = {
  sut: AlunoController
  emailValidatorSpy: EmailValidatorSpy
  addAlunoSpy: AddAlunoSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const addAlunoSpy = new AddAlunoSpy()
  const sut = new AlunoController(emailValidatorSpy, addAlunoSpy)
  return {
    sut,
    emailValidatorSpy,
    addAlunoSpy
  }
}

describe('Aluno Controller', () => {
  test('Should return 400 if no /nome/ is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        // nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910,
        matricula: 'any_matricula'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('nome')))
  })

  test('Should return 400 if no /telefone/ is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        nome: 'any_nome',
        // telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910,
        matricula: 'any_matricula'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('telefone')))
  })

  test('Should return 400 if no /email/ is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        // email: 'any_email@mail.com',
        cpf: 12345678910,
        matricula: 'any_matricula'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no /cpf/ is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        // cpf: 12345678910
        matricula: 'any_matricula'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('cpf')))
  })

  test('Should return 400 if no /matricula/ is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
        // matricula: 'any_matricula'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('matricula')))
  })

  test('Should return 400 if an invalid /email/ is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'invalid_email@mail.com',
        cpf: 12345678910,
        matricula: 'any_matricula'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
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
    expect(emailValidatorSpy.email).toBe('any_email@mail.com')
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
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
})
