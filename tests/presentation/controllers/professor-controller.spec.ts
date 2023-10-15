import { AddProfessorSpy, ValidationSpy } from '../mocks'
import { ProfessorController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { type HttpRequest } from '@/presentation/protocols'

import { faker } from '@faker-js/faker'

const mockRequest = (): HttpRequest => ({
  body: {
    nome: faker.person.fullName(),
    telefone: faker.phone.number(),
    email: faker.internet.email(),
    cpf: faker.string.numeric(11)
  }
})

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
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.word.words())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddProfessor with correct values', async () => {
    const { sut, addProfessorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addProfessorSpy.addProfessorParams).toEqual(request.body)
  })

  test('Should return 500 if AddProfessor throws', async () => {
    const { sut, addProfessorSpy } = makeSut()
    jest.spyOn(addProfessorSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addProfessorSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addProfessorSpy.result))
  })
})
