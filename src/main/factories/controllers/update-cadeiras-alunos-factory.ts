import { makeLogControllerDecorator } from '../decorators'
import { makeDbUpdateCadeirasAlunos } from '../usecases/update-cadeiras-alunos-factory'

import { type Controller } from '@/presentation/protocols'
import { UpdateCadeirasAlunosController } from '@/presentation/controllers/update-cadeiras-alunos-controller'

export const makeUpdateCadeirasAlunosController = (): Controller => {
  const controller = new UpdateCadeirasAlunosController(makeDbUpdateCadeirasAlunos())
  return makeLogControllerDecorator(controller)
}
