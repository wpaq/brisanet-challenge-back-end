import { type Controller, type HttpRequest, type HttpResponse, type Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { type AddAluno } from '@/domain/usecases'

export class AddAlunoController implements Controller {
  constructor (
    private readonly addAluno: AddAluno,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { nome, telefone, email, cpf, matricula } = httpRequest.body
      const aluno = await this.addAluno.add({
        nome,
        telefone,
        email,
        cpf,
        matricula
      })
      if (!aluno) {
        return forbidden(new EmailInUseError())
      }

      return ok(aluno)
    } catch (error) {
      return serverError(error)
    }
  }
}
