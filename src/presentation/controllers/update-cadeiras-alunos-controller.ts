import { type HttpRequest, type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { type CheckCadeirasAlunosById, type UpdateCadeirasAlunos } from '@/domain/usecases'

export class UpdateCadeirasAlunosController implements Controller {
  constructor (
    private readonly updateCadeirasAlunos: UpdateCadeirasAlunos,
    private readonly checkCadeirasAlunosById: CheckCadeirasAlunosById,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

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
