import { type HttpRequest, type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { type LoadCadeiras } from '@/domain/usecases'

export class LoadCadeiraController implements Controller {
  constructor (private readonly loadCadeiras: LoadCadeiras) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const cadeiras = await this.loadCadeiras.loadAll()
      return ok(cadeiras)
    } catch (error) {
      return serverError(error)
    }
  }
}
