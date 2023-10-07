import { ProfessorController } from '@/presentation/controllers'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers'
import { type EmailValidator } from '@/presentation/protocols'
import { type AddProfessor, type AddProfessorParams } from '@/domain/usecases/add-professor'
import { type ProfessorModel } from '@/domain/models/professor'

const makeFakeProfessorModel = (): ProfessorModel => ({
  id: 'valid_id',
  nome: 'valid_name',
  telefone: 123456789,
  email: 'valid_email@mail.com',
  cpf: 12345678910
})

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorSpy implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorSpy()
}

const mockAddProfessor = (): AddProfessor => {
  class AddProfessorSpy implements AddProfessor {
    async add (data: AddProfessorParams): Promise<ProfessorModel | null> {
      return makeFakeProfessorModel()
    }
  }
  return new AddProfessorSpy()
}

type SutTypes = {
  sut: ProfessorController
  emailValidatorSpy: EmailValidator
  addProfessorSpy: AddProfessor
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = mockEmailValidator()
  const addProfessorSpy = mockAddProfessor()
  const sut = new ProfessorController(emailValidatorSpy, addProfessorSpy)
  return {
    sut,
    emailValidatorSpy,
    addProfessorSpy
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
    expect(httpResponse).toEqual(serverError())
  })

  test('Should call AddProfessor with correct values', async () => {
    const { sut, addProfessorSpy } = makeSut()
    const addSpy = jest.spyOn(addProfessorSpy, 'add')
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      nome: 'any_nome',
      telefone: 123456789,
      email: 'any_email@mail.com',
      cpf: 12345678910
    })
  })
})
