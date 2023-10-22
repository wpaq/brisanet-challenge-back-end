import { type Validation, type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { AlreadyRegisteredError, InvalidParamError, RegistrationLimitError } from '@/presentation/errors'
import { type CheckAlunoById, type AddCadeirasAlunos, type CheckCadeiraById, type CountCadeirasAlunosById } from '@/domain/usecases'

export class CadeirasAlunosController implements Controller {
  constructor (
    private readonly addCadeirasAlunos: AddCadeirasAlunos,
    private readonly validation: Validation,
    private readonly checkAlunoById: CheckAlunoById,
    private readonly checkCadeiraById: CheckCadeiraById,
    private readonly countCadeirasAlunosById: CountCadeirasAlunosById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { alunoId, cadeiraId } = httpRequest.body
      const alunoExists = await this.checkAlunoById.checkById(alunoId)
      const cadeiraExists = await this.checkCadeiraById.checkById(cadeiraId)
      if (!alunoExists) {
        return forbidden(new InvalidParamError('alunoId'))
      }
      if (!cadeiraExists) {
        return forbidden(new InvalidParamError('cadeiraId'))
      }

      const countAlunoRegistrations = await this.countCadeirasAlunosById.countByAlunoId(alunoId)
      const countCadeiraRegistrations = await this.countCadeirasAlunosById.countByCadeiraId(cadeiraId)
      if (countAlunoRegistrations === 8) {
        return forbidden(new RegistrationLimitError())
      }
      if (countCadeiraRegistrations === 1) {
        return forbidden(new AlreadyRegisteredError())
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
