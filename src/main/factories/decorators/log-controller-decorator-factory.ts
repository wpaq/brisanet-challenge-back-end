import { LogControllerDecorator } from '@/main/decorators'
import { LogPrismaRepository } from '@/infra/db/prisma'
import { type Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(controller, logPrismaRepository)
}
