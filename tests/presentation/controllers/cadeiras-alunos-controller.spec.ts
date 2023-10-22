import { AddCadeirasAlunosSpy, CheckAlunoByIdSpy, CheckCadeiraByIdSpy, CountCadeirasAlunosByIdSpy, ValidationSpy } from '@/tests/presentation/mocks'

import { type HttpRequest } from '@/presentation/protocols'
import { CadeirasAlunosController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError, RegistrationLimitError, AlreadyRegisteredError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'

import { faker } from '@faker-js/faker'

const mockRequest = (): HttpRequest => ({
  body: {
    alunoId: faker.string.uuid(),
    cadeiraId: faker.string.uuid()
  }
})

type SutTypes = {
  sut: CadeirasAlunosController
  addCadeirasAlunosSpy: AddCadeirasAlunosSpy
  validationSpy: ValidationSpy
  checkAlunoByIdSpy: CheckAlunoByIdSpy
  checkCadeiraByIdSpy: CheckCadeiraByIdSpy
  countCadeirasAlunosByIdSpy: CountCadeirasAlunosByIdSpy
}

const makeSut = (): SutTypes => {
  const addCadeirasAlunosSpy = new AddCadeirasAlunosSpy()
  const validationSpy = new ValidationSpy()
  const checkAlunoByIdSpy = new CheckAlunoByIdSpy()
  const checkCadeiraByIdSpy = new CheckCadeiraByIdSpy()
  const countCadeirasAlunosByIdSpy = new CountCadeirasAlunosByIdSpy()
  const sut = new CadeirasAlunosController(addCadeirasAlunosSpy, validationSpy, checkAlunoByIdSpy, checkCadeiraByIdSpy, countCadeirasAlunosByIdSpy)
  return {
    sut,
    addCadeirasAlunosSpy,
    validationSpy,
    checkAlunoByIdSpy,
    checkCadeiraByIdSpy,
    countCadeirasAlunosByIdSpy
  }
}

describe('CadeirasAlunos Controller', () => {
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

  test('Should call AddCadeirasAlunos with correct value', async () => {
    const { sut, addCadeirasAlunosSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCadeirasAlunosSpy.addCadeirasAlunosParams).toEqual(request.body)
  })

  test('Should return 500 if AddCadeirasAlunos throws', async () => {
    const { sut, addCadeirasAlunosSpy } = makeSut()
    jest.spyOn(addCadeirasAlunosSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addCadeirasAlunosSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addCadeirasAlunosSpy.result))
  })

  test('Should return 403 if CheckAlunoById returns false', async () => {
    const { sut, checkAlunoByIdSpy } = makeSut()
    checkAlunoByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('alunoId')))
  })

  test('Should return 403 if CheckCadeiraById returns false', async () => {
    const { sut, checkCadeiraByIdSpy } = makeSut()
    checkCadeiraByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('cadeiraId')))
  })

  test('Should return 403 if CountCadeirasAlunosById.countByAlunoId returns 8', async () => {
    const { sut, countCadeirasAlunosByIdSpy } = makeSut()
    countCadeirasAlunosByIdSpy.result = 8
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new RegistrationLimitError()))
  })

  test('Should return 403 if CountCadeirasAlunosById.countByCadeiraId returns 1', async () => {
    const { sut, countCadeirasAlunosByIdSpy } = makeSut()
    countCadeirasAlunosByIdSpy.result = 1
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AlreadyRegisteredError()))
  })
})
