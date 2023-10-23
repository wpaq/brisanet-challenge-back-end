import { DbLoadCadeiras } from '@/data/usecases'
import { type LoadCadeiras } from '@/domain/usecases'
import { CadeiraPrismaRepository } from '@/infra/db/prisma'

export const makeDbLoadCadeiras = (): LoadCadeiras => {
  const cadeiraPrismaRepository = new CadeiraPrismaRepository()
  return new DbLoadCadeiras(cadeiraPrismaRepository)
}
