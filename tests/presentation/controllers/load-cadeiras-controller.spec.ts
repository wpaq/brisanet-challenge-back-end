import { LoadCadeirasSpy } from '@/tests/presentation/mocks'

import { LoadCadeirasController } from '@/presentation/controllers'
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
  sut: LoadCadeirasController
  loadCadeirasSpy: LoadCadeirasSpy
}

const makeSut = (): SutTypes => {
  const loadCadeirasSpy = new LoadCadeirasSpy()
  const sut = new LoadCadeirasController(loadCadeirasSpy)
  return {
    sut,
    loadCadeirasSpy
  }
}

describe('LoadCadeira Controller', () => {
  test('Should call LoadCadeiras', async () => {
    const { sut, loadCadeirasSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(loadCadeirasSpy.result).toEqual(httpResponse.body)
  })

  test('Should return 500 if LoadCadeiras throws', async () => {
    const { sut, loadCadeirasSpy } = makeSut()
    jest.spyOn(loadCadeirasSpy, 'loadAll').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, loadCadeirasSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadCadeirasSpy.result))
  })
})
