import { DbAddCadeira } from '@/data/usecases'
import { type AddCadeira } from '@/domain/usecases/add-cadeira'
import { CadeiraPrismaRepository } from '@/infra/db/prisma'

export const makeDbAddCadeira = (): AddCadeira => {
  const cadeiraPrismaRepository = new CadeiraPrismaRepository()
  return new DbAddCadeira(cadeiraPrismaRepository)
}