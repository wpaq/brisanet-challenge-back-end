import { PrismaHelper } from './helpers'

import { type LogErrorRepository } from '@/data/protocols'

export class LogPrismaRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    await PrismaHelper.client.logError.create({
      data: {
        stack,
        date: new Date()
      }
    })
  }
}
