import { DbLoadCadeiraById } from '@/data/usecases'
import { type LoadCadeiraById } from '@/domain/usecases'
import { CadeiraPrismaRepository } from '@/infra/db/prisma'

export const makeDbLoadCadeiraById = (): LoadCadeiraById => {
  const cadeiraPrismaRepository = new CadeiraPrismaRepository()
  return new DbLoadCadeiraById(cadeiraPrismaRepository)
}
