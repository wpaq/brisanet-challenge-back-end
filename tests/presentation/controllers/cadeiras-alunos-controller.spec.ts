import { AddCadeirasAlunosSpy, ValidationSpy } from '@/tests/presentation/mocks'

import { type HttpRequest } from '@/presentation/protocols'
import { CadeirasAlunosController } from '@/presentation/controllers'

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
})
