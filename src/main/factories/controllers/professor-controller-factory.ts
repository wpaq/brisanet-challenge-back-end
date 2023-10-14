import { type Controller } from '@/presentation/protocols'
import { ProfessorController } from '@/presentation/controllers'
import { makeEmailValidator } from '../validators'
import { makeDbAddProfessor } from '../usecases/add-professor-factory'
import { LogControllerDecorator } from '@/main/decorators'
import { LogPrismaRepository } from '@/infra/db/prisma'

export const makeProfessorController = (): Controller => {
  const controller = new ProfessorController(makeEmailValidator(), makeDbAddProfessor())
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(controller, logPrismaRepository)
}
