import { makeLogControllerDecorator } from '../decorators'
import { makeDbUpdateCadeirasAlunos } from '../usecases/update-cadeiras-alunos-factory'
import { makeUpdateCadeirasAlunosValidation } from './update-cadeiras-alunos-validation-factory'
import { makeDbCheckCadeirasAlunosById } from '../usecases/check-cadeiras-alunos-by-id-factory'

import { type Controller } from '@/presentation/protocols'
import { UpdateCadeirasAlunosController } from '@/presentation/controllers/update-cadeiras-alunos-controller'

export const makeUpdateCadeirasAlunosController = (): Controller => {
  const controller = new UpdateCadeirasAlunosController(
    makeDbUpdateCadeirasAlunos(),
    makeDbCheckCadeirasAlunosById(),
    makeUpdateCadeirasAlunosValidation()
  )
  return makeLogControllerDecorator(controller)
}
