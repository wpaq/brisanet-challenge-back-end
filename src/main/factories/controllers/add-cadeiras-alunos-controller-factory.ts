import { makeAddCadeirasAlunosValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbCountCadeirasAlunosById, makeDbAddCadeirasAlunos, makeDbCheckCadeiraById, makeDbCheckAlunoById, makeDbLoadCadeiraById } from '@/main/factories/usecases'

import { AddCadeirasAlunosController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeAddCadeirasAlunosController = (): Controller => {
  const controller = new AddCadeirasAlunosController(
    makeDbAddCadeirasAlunos(),
    makeAddCadeirasAlunosValidation(),
    makeDbCheckAlunoById(),
    makeDbCheckCadeiraById(),
    makeDbCountCadeirasAlunosById(),
    makeDbLoadCadeiraById()
  )
  return makeLogControllerDecorator(controller)
}
