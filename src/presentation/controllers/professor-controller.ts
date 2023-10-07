import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'

export class ProfessorController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['nome', 'telefone']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field)
        }
      }
    }

    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
