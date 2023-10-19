import { AddCadeiraSpy, CheckCadeiraByPeriodSpy, CheckProfessorByIdSpy, ValidationSpy } from '@/tests/presentation/mocks'

import { type HttpRequest } from '@/presentation/protocols'
import { CadeiraController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError, PeriodInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'

import { faker } from '@faker-js/faker'

const mockRequest = (): HttpRequest => ({
  body: {
    nome: faker.person.fullName(),
    slug: faker.word.words(),
    dataInicio: faker.date.anytime(),
    dataFim: faker.date.anytime(),
    cargaHoraria: faker.number.int({ max: 100 }),
    professorId: faker.string.uuid()
  }
})

type SutTypes = {
  sut: CadeiraController
  addCadeiraSpy: AddCadeiraSpy
  validationSpy: ValidationSpy
  checkProfessorByIdSpy: CheckProfessorByIdSpy
  checkCadeiraByPeriodSpy: CheckCadeiraByPeriodSpy
}

const makeSut = (): SutTypes => {
  const addCadeiraSpy = new AddCadeiraSpy()
  const validationSpy = new ValidationSpy()
  const checkProfessorByIdSpy = new CheckProfessorByIdSpy()
  const checkCadeiraByPeriodSpy = new CheckCadeiraByPeriodSpy()
  const sut = new CadeiraController(addCadeiraSpy, validationSpy, checkProfessorByIdSpy, checkCadeiraByPeriodSpy)
  return {
    sut,
    addCadeiraSpy,
    validationSpy,
    checkProfessorByIdSpy,
    checkCadeiraByPeriodSpy
  }
}

describe('Cadeira Controller', () => {
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

  test('Should call AddCadeira with correct value', async () => {
    const { sut, addCadeiraSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCadeiraSpy.addCadeiraParams).toEqual(request.body)
  })

  test('Should return 500 if AddCadeira throws', async () => {
    const { sut, addCadeiraSpy } = makeSut()
    jest.spyOn(addCadeiraSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addCadeiraSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addCadeiraSpy.result))
  })

  test('Should return 403 if CheckProfessorById returns false', async () => {
    const { sut, checkProfessorByIdSpy } = makeSut()
    checkProfessorByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('professorId')))
  })

  test('Should return 403 if CheckCadeiraByPeriod returns true', async () => {
    const { sut, checkCadeiraByPeriodSpy } = makeSut()
    checkCadeiraByPeriodSpy.result = true
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new PeriodInUseError()))
  })
})
