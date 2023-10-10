import { LogControllerDecorator } from '@/main/decorators'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'

interface SutTypes {
  sut: LogControllerDecorator
  controllerSpy: Controller
}

const makeController = (): Controller => {
  class ControllerSpy implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          nome: 'Wallyson'
        }
      }
      return await Promise.resolve(httpResponse)
    }
  }
  return new ControllerSpy()
}

const makeSut = (): SutTypes => {
  const controllerSpy = makeController()
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
