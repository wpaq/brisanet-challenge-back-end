import { LogControllerDecorator } from '@/main/decorators'
import { type Controller } from '@/presentation/protocols'
import { LogPrismaRepository } from '@/infra/db/prisma'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(controller, logPrismaRepository)
}
