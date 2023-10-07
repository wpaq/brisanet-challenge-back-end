import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'

export class ProfessorController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 400,
      body: 'ok'
    }
  }
}
