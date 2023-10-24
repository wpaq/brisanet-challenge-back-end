import { makeProfessorValidation } from '@/main/factories/validations'
import { makeDbAddProfessor } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'

import { ProfessorController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeProfessorController = (): Controller => {
  const controller = new ProfessorController(makeDbAddProfessor(), makeProfessorValidation())
  return makeLogControllerDecorator(controller)
}
