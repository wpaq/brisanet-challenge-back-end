import { AddCadeirasAlunosSpy, ValidationSpy } from '@/tests/presentation/mocks'

import { type HttpRequest } from '@/presentation/protocols'
import { CadeirasAlunosController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'

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
}

const makeSut = (): SutTypes => {
  const addCadeirasAlunosSpy = new AddCadeirasAlunosSpy()
  const validationSpy = new ValidationSpy()
  const sut = new CadeirasAlunosController(addCadeirasAlunosSpy, validationSpy)
  return {
    sut,
    addCadeirasAlunosSpy,
    validationSpy
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
})
