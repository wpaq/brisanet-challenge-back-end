import { LogControllerDecorator } from '@/main/decorators'
import { ok } from '@/presentation/helpers'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'

class ControllerSpy implements Controller {
  httpResponse = ok('any_data')
  request: HttpRequest

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.request = httpRequest
    return this.httpResponse
  }
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const sut = new LogControllerDecorator(controllerSpy)
  return {
    sut,
    controllerSpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const handleSpy = jest.spyOn(controllerSpy, 'handle')
    const httpRequest = {
      body: {
        nome: 'any_nome',
        telefone: '0123456789',
        email: 'any_email@mail.com',
        cpf: '12345678910'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
