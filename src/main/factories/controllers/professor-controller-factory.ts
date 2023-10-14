import { type Controller } from '@/presentation/protocols'
import { ProfessorController } from '@/presentation/controllers'
import { makeEmailValidator } from '../validators'
import { makeDbAddProfessor } from '../usecases/add-professor-factory'
import { makeLogControllerDecorator } from '../decorators'

export const makeProfessorController = (): Controller => {
  const controller = new ProfessorController(makeEmailValidator(), makeDbAddProfessor())
  return makeLogControllerDecorator(controller)
}
