import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbUpdateCadeirasAlunos, makeDbCheckCadeirasAlunosById } from '@/main/factories/usecases'
import { makeUpdateCadeirasAlunosValidation } from '@/main/factories/validations'

import { type Controller } from '@/presentation/protocols'
import { UpdateCadeirasAlunosController } from '@/presentation/controllers'

export const makeUpdateCadeirasAlunosController = (): Controller => {
  const controller = new UpdateCadeirasAlunosController(
    makeDbUpdateCadeirasAlunos(),
    makeDbCheckCadeirasAlunosById(),
    makeUpdateCadeirasAlunosValidation()
  )
  return makeLogControllerDecorator(controller)
}
