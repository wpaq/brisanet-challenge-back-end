import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'

export class ProfessorController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome, telefone } = httpRequest.body
    if (!nome) {
      return {
        statusCode: 400,
        body: new MissingParamError('nome')
      }
    }
    if (!telefone) {
      return {
        statusCode: 400,
        body: new MissingParamError('telefone')
      }
    }
    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
