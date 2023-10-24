import { makeCadeirasAlunosValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbCountCadeirasAlunosById, makeDbAddCadeirasAlunos, makeDbCheckCadeiraById, makeDbCheckAlunoById, makeDbLoadCadeiraById } from '@/main/factories/usecases'

import { CadeirasAlunosController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeCadeirasAlunosController = (): Controller => {
  const controller = new CadeirasAlunosController(
    makeDbAddCadeirasAlunos(),
    makeCadeirasAlunosValidation(),
    makeDbCheckAlunoById(),
    makeDbCheckCadeiraById(),
    makeDbCountCadeirasAlunosById(),
    makeDbLoadCadeiraById()
  )
  return makeLogControllerDecorator(controller)
}
