import { type EmailValidator, type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { type AddAluno } from '@/domain/usecases/add-aluno'

export class AlunoController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAluno: AddAluno
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['nome', 'telefone', 'email', 'cpf', 'matricula']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { nome, telefone, email, cpf, matricula } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const aluno = await this.addAluno.add({
        nome,
        telefone,
        email,
        cpf,
        matricula
      })

      return ok(aluno)
    } catch (error) {
      return serverError(error)
    }
  }
}
