import { type EmailValidator, type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { type AddAluno } from '@/domain/usecases/add-aluno'

export class AlunoController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAluno: AddAluno
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['nome', 'telefone', 'email', 'cpf', 'matricula']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return ok('any')
  }
}
