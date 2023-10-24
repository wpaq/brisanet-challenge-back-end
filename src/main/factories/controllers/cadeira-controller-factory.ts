import { makeCadeiraValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddCadeira, makeDbCheckProfessorById, makeDbCheckCadeiraByPeriod } from '@/main/factories/usecases'

import { CadeiraController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeCadeiraController = (): Controller => {
  const controller = new CadeiraController(makeDbAddCadeira(), makeCadeiraValidation(), makeDbCheckProfessorById(), makeDbCheckCadeiraByPeriod())
  return makeLogControllerDecorator(controller)
}
