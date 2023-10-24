import { CheckCadeirasAlunosByIdSpy, UpdateCadeirasAlunosSpy, ValidationSpy } from '@/tests/presentation/mocks'

import { UpdateCadeirasAlunosController } from '@/presentation/controllers'
import { type HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'

import { faker } from '@faker-js/faker'

const mockRequest = (): HttpRequest => ({
  body: {
    id: faker.string.uuid(),
    statusMatricula: faker.word.words()
  }
})

type SutTypes = {
  sut: UpdateCadeirasAlunosController
  updateCadeirasAlunosSpy: UpdateCadeirasAlunosSpy
  checkCadeirasAlunosByIdSpy: CheckCadeirasAlunosByIdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const updateCadeirasAlunosSpy = new UpdateCadeirasAlunosSpy()
  const checkCadeirasAlunosByIdSpy = new CheckCadeirasAlunosByIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new UpdateCadeirasAlunosController(updateCadeirasAlunosSpy, checkCadeirasAlunosByIdSpy, validationSpy)
  return {
    sut,
    updateCadeirasAlunosSpy,
    checkCadeirasAlunosByIdSpy,
    validationSpy
  }
}

describe('UpdateCadeirasAlunos Controller', () => {
  test('Should call UpdateCadeirasAlunos with correct value', async () => {
    const { sut, updateCadeirasAlunosSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateCadeirasAlunosSpy.updateCadeirasAlunosParam).toEqual(request.body)
  })

  test('Should return 500 if UpdateCadeirasAlunos throws', async () => {
    const { sut, updateCadeirasAlunosSpy } = makeSut()
    jest.spyOn(updateCadeirasAlunosSpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, updateCadeirasAlunosSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateCadeirasAlunosSpy.result))
  })

  test('Should return 403 if CheckCadeirasAlunosById returns false', async () => {
    const { sut, checkCadeirasAlunosByIdSpy } = makeSut()
    checkCadeirasAlunosByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })

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
})
