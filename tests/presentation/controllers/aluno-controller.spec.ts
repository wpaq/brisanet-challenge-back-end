import { AddAlunoSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { AlunoController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { type HttpRequest } from '@/presentation/protocols'

import { faker } from '@faker-js/faker'

const mockRequest = (): HttpRequest => ({
  body: {
    nome: faker.person.fullName(),
    telefone: faker.phone.number(),
    email: faker.internet.email(),
    cpf: faker.string.numeric(11),
    matricula: faker.string.numeric(6)
  }
})

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

  test('Should call AddAluno with correct values', async () => {
    const { sut, addAlunoSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAlunoSpy.addAlunoParams).toEqual(request.body)
  })

  test('Should return 500 if AddAluno throws', async () => {
    const { sut, addAlunoSpy } = makeSut()
    jest.spyOn(addAlunoSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addAlunoSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addAlunoSpy.result))
  })
})
