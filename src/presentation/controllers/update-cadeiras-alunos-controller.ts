import { type HttpRequest, type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { type UpdateCadeirasAlunos } from '@/domain/usecases'

export class UpdateCadeirasAlunosController implements Controller {
  constructor (private readonly updateCadeirasAlunos: UpdateCadeirasAlunos) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const updatedCadeira = await this.updateCadeirasAlunos.update(httpRequest.body)
      return ok(updatedCadeira)
    } catch (error) {
      return serverError(error)
    }
  }
}
