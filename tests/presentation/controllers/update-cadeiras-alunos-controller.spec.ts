import { UpdateCadeirasAlunosSpy } from '@/tests/presentation/mocks'

import { UpdateCadeirasAlunosController } from '@/presentation/controllers'
import { type HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'

import { faker } from '@faker-js/faker'

const mockRequest = (): HttpRequest => ({
  body: {
    alunoId: faker.string.uuid(),
    cadeiraId: faker.string.uuid()
  }
})

type SutTypes = {
  sut: UpdateCadeirasAlunosController
  updateCadeirasAlunosSpy: UpdateCadeirasAlunosSpy
}

const makeSut = (): SutTypes => {
  const updateCadeirasAlunosSpy = new UpdateCadeirasAlunosSpy()
  const sut = new UpdateCadeirasAlunosController(updateCadeirasAlunosSpy)
  return {
    sut,
    updateCadeirasAlunosSpy
  }
}

describe('UpdateCadeirasAlunos Controller', () => {
  test('Should return 200 if valid data is provided', async () => {
    const { sut, updateCadeirasAlunosSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateCadeirasAlunosSpy.result))
  })
})
