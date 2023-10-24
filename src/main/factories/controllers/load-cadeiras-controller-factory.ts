import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadCadeiras } from '@/main/factories/usecases'

import { type Controller } from '@/presentation/protocols'
import { LoadCadeiraController } from '@/presentation/controllers'

export const makeLoadCadeirasController = (): Controller => {
  const controller = new LoadCadeiraController(makeDbLoadCadeiras())
  return makeLogControllerDecorator(controller)
}
