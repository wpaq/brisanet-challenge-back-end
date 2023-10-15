import { makeEmailValidator } from '../validators'
import { makeDbAddProfessor } from '../usecases/add-professor-factory'
import { makeLogControllerDecorator } from '../decorators'
import { makeProfessorValidation } from './professor-validation-factory'
import { ProfessorController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeProfessorController = (): Controller => {
  const controller = new ProfessorController(makeEmailValidator(), makeDbAddProfessor(), makeProfessorValidation())
  return makeLogControllerDecorator(controller)
}
