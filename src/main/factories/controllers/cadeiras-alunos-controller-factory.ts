import { makeCadeirasAlunosValidation } from './cadeiras-alunos-validation-factory'
import { makeLogControllerDecorator } from '../decorators'
import { makeDbCountCadeirasAlunosById } from '../usecases/count-cadeiras-alunos-by-id-factory'
import { makeDbAddCadeirasAlunos } from '../usecases/add-cadeiras-alunos-factory'
import { makeDbCheckCadeiraById } from '../usecases/check-cadeira-by-id-factory'
import { makeDbCheckAlunoById } from '../usecases/check-aluno-by-id-factory'
import { CadeirasAlunosController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeCadeirasAlunosController = (): Controller => {
  const controller = new CadeirasAlunosController(
    makeDbAddCadeirasAlunos(),
    makeCadeirasAlunosValidation(),
    makeDbCheckAlunoById(),
    makeDbCheckCadeiraById(),
    makeDbCountCadeirasAlunosById()
  )
  return makeLogControllerDecorator(controller)
}
