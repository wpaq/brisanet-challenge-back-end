import { DbCheckCadeiraById } from '@/data/usecases'
import { type CheckCadeiraById } from '@/domain/usecases'
import { CadeiraPrismaRepository } from '@/infra/db/prisma'

export const makeDbCheckCadeiraById = (): CheckCadeiraById => {
  const cadeiraPrismaRepository = new CadeiraPrismaRepository()
  return new DbCheckCadeiraById(cadeiraPrismaRepository)
}
