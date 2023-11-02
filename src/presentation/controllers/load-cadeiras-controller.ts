import { type HttpRequest, type Controller, type HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { type LoadCadeiras } from '@/domain/usecases'

export class LoadCadeirasController implements Controller {
  constructor (private readonly loadCadeiras: LoadCadeiras) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const cadeiras = await this.loadCadeiras.loadAll()
      if (cadeiras.length) {
        return ok(cadeiras)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
