import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadCadeiras } from '@/main/factories/usecases'

import { type Controller } from '@/presentation/protocols'
import { LoadCadeirasController } from '@/presentation/controllers'

export const makeLoadCadeirasController = (): Controller => {
  const controller = new LoadCadeirasController(makeDbLoadCadeiras())
  return makeLogControllerDecorator(controller)
}
