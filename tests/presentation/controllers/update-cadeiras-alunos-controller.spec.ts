import { UpdateCadeirasAlunosSpy } from '@/tests/presentation/mocks'

import { UpdateCadeirasAlunosController } from '@/presentation/controllers'
import { type HttpRequest } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'

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
})
