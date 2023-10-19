import { type Validation, type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError, PeriodInUseError } from '@/presentation/errors'
import { type CheckCadeiraByPeriod, type AddCadeira, type CheckProfessorById } from '@/domain/usecases'

export class CadeiraController implements Controller {
  constructor (
    private readonly addCadeira: AddCadeira,
    private readonly validation: Validation,
    private readonly checkProfessorById: CheckProfessorById,
    private readonly checkCadeiraByPeriod: CheckCadeiraByPeriod
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { nome, slug, dataInicio, dataFim, cargaHoraria, professorId } = httpRequest.body

      const professorExists = await this.checkProfessorById.checkById(professorId)
      if (!professorExists) {
        return forbidden(new InvalidParamError('professorId'))
      }

      const periodExists = await this.checkCadeiraByPeriod.checkByPeriod(dataInicio, dataFim)
      if (periodExists) {
        return forbidden(new PeriodInUseError())
      }

      const cadeira = await this.addCadeira.add({
        nome,
        slug,
        dataInicio,
        dataFim,
        cargaHoraria,
        professorId
      })

      return ok(cadeira)
    } catch (error) {
      return serverError(error)
    }
  }
}
