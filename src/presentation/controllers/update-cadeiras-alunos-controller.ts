import { type HttpRequest, type Controller, type HttpResponse } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { type CheckCadeirasAlunosById, type UpdateCadeirasAlunos } from '@/domain/usecases'

export class UpdateCadeirasAlunosController implements Controller {
  constructor (
    private readonly updateCadeirasAlunos: UpdateCadeirasAlunos,
    private readonly checkCadeirasAlunosById: CheckCadeirasAlunosById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const exists = await this.checkCadeirasAlunosById.checkById(httpRequest.body.id)
      if (!exists) {
        return forbidden(new InvalidParamError('cadeirasAlunosId'))
      }
      const updatedCadeira = await this.updateCadeirasAlunos.update(httpRequest.body)
      return ok(updatedCadeira)
    } catch (error) {
      return serverError(error)
    }
  }
}
