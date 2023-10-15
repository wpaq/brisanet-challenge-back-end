import { type EmailValidator, type Controller, type HttpRequest, type HttpResponse, type Validation } from '@/presentation/protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { type AddProfessor } from '@/domain/usecases/add-professor'

export class ProfessorController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addProfessor: AddProfessor,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const requiredFields = ['nome', 'telefone', 'email', 'cpf']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { nome, telefone, email, cpf } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const professor = await this.addProfessor.add({
        nome,
        telefone,
        email,
        cpf
      })

      return ok(professor)
    } catch (error) {
      return serverError(error)
    }
  }
}
