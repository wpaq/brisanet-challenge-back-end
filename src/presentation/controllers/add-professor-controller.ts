import { type Controller, type HttpRequest, type HttpResponse, type Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, forbidden } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors/'
import { type AddProfessor } from '@/domain/usecases'

export class AddProfessorController implements Controller {
  constructor (
    private readonly addProfessor: AddProfessor,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { nome, telefone, email, cpf } = httpRequest.body
      const professor = await this.addProfessor.add({
        nome,
        telefone,
        email,
        cpf
      })
      if (!professor) {
        return forbidden(new EmailInUseError())
      }

      return ok(professor)
    } catch (error) {
      return serverError(error)
    }
  }
}
