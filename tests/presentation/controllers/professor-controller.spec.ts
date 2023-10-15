import { ProfessorController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers'
import { AddProfessorSpy, ValidationSpy } from '../mocks'

type SutTypes = {
  sut: ProfessorController
  addProfessorSpy: AddProfessorSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addProfessorSpy = new AddProfessorSpy()
  const validationSpy = new ValidationSpy()
  const sut = new ProfessorController(addProfessorSpy, validationSpy)
  return {
    sut,
    addProfessorSpy,
    validationSpy
  }
}

describe('Professor Controller', () => {
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

  test('Should call AddProfessor with correct values', async () => {
    const { sut, addProfessorSpy } = makeSut()
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
      }
    }
    await sut.handle(httpRequest)
    expect(addProfessorSpy.addProfessorParams).toEqual({
      nome: 'any_nome',
      telefone: 123456789,
      email: 'any_email@mail.com',
      cpf: 12345678910
    })
  })

  test('Should return 500 if AddProfessor throws', async () => {
    const { sut, addProfessorSpy } = makeSut()
    jest.spyOn(addProfessorSpy, 'add').mockRejectedValueOnce(new Error())
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
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addProfessorSpy } = makeSut()
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(addProfessorSpy.professorModel)
  })
})
