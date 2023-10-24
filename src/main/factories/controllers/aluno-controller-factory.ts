import { makeAlunoValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddAluno } from '@/main/factories/usecases'

import { AlunoController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeAlunoController = (): Controller => {
  const controller = new AlunoController(makeDbAddAluno(), makeAlunoValidation())
  return makeLogControllerDecorator(controller)
}
