import { ProfessorController } from '@/presentation/controllers'
import { MissingParamError, InvalidParamError, ServerError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { type EmailValidator } from '@/presentation/protocols'

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorSpy implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorSpy()
}

type SutTypes = {
  sut: ProfessorController
  emailValidatorSpy: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = mockEmailValidator()
  const sut = new ProfessorController(emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Professor Controller', () => {
  test('Should return 400 if no /nome/ is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        // nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
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
        cpf: 12345678910
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
        cpf: 12345678910
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
        email: 'any_email@mail.com'
        // cpf: 12345678910
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('cpf')))
  })

  test('Should return 400 if an invalid /email/ is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'invalid_email@mail.com',
        cpf: 12345678910
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid')
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
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
        cpf: 12345678910
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
