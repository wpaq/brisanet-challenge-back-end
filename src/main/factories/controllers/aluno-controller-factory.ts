import { makeAlunoValidation } from './aluno-validation-factory'
import { makeLogControllerDecorator } from '../decorators'
import { makeDbAddAluno } from '../usecases/add-aluno-factory'
import { AlunoController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeAlunoController = (): Controller => {
  const controller = new AlunoController(makeDbAddAluno(), makeAlunoValidation())
  return makeLogControllerDecorator(controller)
}
