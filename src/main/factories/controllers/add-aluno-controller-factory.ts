import { makeAddAlunoValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddAluno } from '@/main/factories/usecases'

import { AddAlunoController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeAddAlunoController = (): Controller => {
  const controller = new AddAlunoController(makeDbAddAluno(), makeAddAlunoValidation())
  return makeLogControllerDecorator(controller)
}
