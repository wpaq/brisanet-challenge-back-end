import { makeAddProfessorValidation } from '@/main/factories/validations'
import { makeDbAddProfessor } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'

import { AddProfessorController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeAddProfessorController = (): Controller => {
  const controller = new AddProfessorController(makeDbAddProfessor(), makeAddProfessorValidation())
  return makeLogControllerDecorator(controller)
}
