import { type Validation, type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { type AddCadeira } from '@/domain/usecases/add-cadeira'
import { badRequest, ok, serverError } from '@/presentation/helpers'

export class CadeiraController implements Controller {
  constructor (
    private readonly addCadeira: AddCadeira,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { nome, slug, dataInicio, dataFim, cargaHoraria, professorId } = httpRequest.body
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
