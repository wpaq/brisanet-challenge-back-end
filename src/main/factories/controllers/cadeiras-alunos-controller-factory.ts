import { makeCadeirasAlunosValidation } from './cadeiras-alunos-validation-factory'
import { makeLogControllerDecorator } from '../decorators'
import { makeDbAddCadeirasAlunos } from '../usecases/add-cadeiras-alunos-factory'
import { makeDbCheckCadeiraById } from '../usecases/check-cadeira-by-id-factory'
import { makeDbCheckAlunoById } from '../usecases/check-aluno-by-id-factory'
import { CadeirasAlunosController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeCadeirasAlunosController = (): Controller => {
  const controller = new CadeirasAlunosController(makeDbAddCadeirasAlunos(), makeCadeirasAlunosValidation(), makeDbCheckAlunoById(), makeDbCheckCadeiraById())
  return makeLogControllerDecorator(controller)
}
