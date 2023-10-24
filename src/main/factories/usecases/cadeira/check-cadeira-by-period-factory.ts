import { DbCheckCadeiraByPeriod } from '@/data/usecases'
import { type CheckCadeiraByPeriod } from '@/domain/usecases'
import { CadeiraPrismaRepository } from '@/infra/db/prisma'

export const makeDbCheckCadeiraByPeriod = (): CheckCadeiraByPeriod => {
  const cadeiraPrismaRepository = new CadeiraPrismaRepository()
  return new DbCheckCadeiraByPeriod(cadeiraPrismaRepository)
}
