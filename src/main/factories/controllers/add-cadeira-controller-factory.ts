import { makeAddCadeiraValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddCadeira, makeDbCheckProfessorById, makeDbCheckCadeiraByPeriod } from '@/main/factories/usecases'

import { AddCadeiraController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeAddCadeiraController = (): Controller => {
  const controller = new AddCadeiraController(makeDbAddCadeira(), makeAddCadeiraValidation(), makeDbCheckProfessorById(), makeDbCheckCadeiraByPeriod())
  return makeLogControllerDecorator(controller)
}
