import { LogErrorRepositorySpy } from '@/tests/data/mocks/mock-db-log'
import { LogControllerDecorator } from '@/main/decorators'
import { ok, serverError } from '@/presentation/helpers'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'

import { faker } from '@faker-js/faker'

const mockFakeRequest = (): HttpRequest => ({
  body: {
    nome: faker.person.fullName(),
    telefone: faker.phone.number(),
    email: faker.internet.email(),
    cpf: faker.string.numeric(11)
  }
})

class ControllerSpy implements Controller {
  httpResponse = ok(faker.string.uuid())
  request: HttpRequest

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.request = httpRequest
    return this.httpResponse
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = faker.word.words()
  return serverError(fakeError)
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(controllerSpy.request).toEqual(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    await sut.handle(mockFakeRequest())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
