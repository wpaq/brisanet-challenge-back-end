import { makeCadeiraValidation } from './cadeira-validation-factory'
import { makeLogControllerDecorator } from '../decorators'
import { makeDbAddCadeira } from '../usecases/add-cadeira-factory'
import { CadeiraController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeCadeiraController = (): Controller => {
  const controller = new CadeiraController(makeDbAddCadeira(), makeCadeiraValidation())
  return makeLogControllerDecorator(controller)
}
