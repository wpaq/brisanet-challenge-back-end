import { type Validation, type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { type AddCadeira } from '@/domain/usecases/add-cadeira'
import { badRequest, ok } from '@/presentation/helpers'

export class CadeiraController implements Controller {
  constructor (
    private readonly addCadeira: AddCadeira,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }

    return ok('any_data')
  }
}
