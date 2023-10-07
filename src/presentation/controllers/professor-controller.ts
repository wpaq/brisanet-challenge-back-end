import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'

export class ProfessorController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 400,
      body: new MissingParamError('nome')
    }
  }
}
