import { type Validation, type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { type CheckAlunoById, type AddCadeirasAlunos } from '@/domain/usecases'

export class CadeirasAlunosController implements Controller {
  constructor (
    private readonly addCadeirasAlunos: AddCadeirasAlunos,
    private readonly validation: Validation,
    private readonly checkAlunoById: CheckAlunoById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { alunoId, cadeiraId } = httpRequest.body
      const alunoExists = await this.checkAlunoById.checkById(alunoId)
      if (!alunoExists) {
        return forbidden(new InvalidParamError('alunoId'))
      }

      const cadeirasAlunos = await this.addCadeirasAlunos.add({
        alunoId,
        cadeiraId
      })

      return ok(cadeirasAlunos)
    } catch (error) {
      return serverError(error)
    }
  }
}
