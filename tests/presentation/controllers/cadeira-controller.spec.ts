import { AddCadeiraSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { type HttpRequest } from '@/presentation/protocols'
import { CadeiraController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'

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
}

const makeSut = (): SutTypes => {
  const addCadeiraSpy = new AddCadeiraSpy()
  const validationSpy = new ValidationSpy()
  const sut = new CadeiraController(addCadeiraSpy, validationSpy)
  return {
    sut,
    addCadeiraSpy,
    validationSpy
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
})
