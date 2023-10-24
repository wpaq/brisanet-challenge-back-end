import { makeLogControllerDecorator } from '../decorators'
import { makeDbLoadCadeiras } from '../usecases/load-cadeiras-factory'
import { type Controller } from '@/presentation/protocols'
import { LoadCadeiraController } from '@/presentation/controllers/load-cadeira-controller'

export const makeLoadCadeirasController = (): Controller => {
  const controller = new LoadCadeiraController(makeDbLoadCadeiras())
  return makeLogControllerDecorator(controller)
}
