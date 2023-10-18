import { makeDbCheckProfessorById } from './check-professor-by-id-factory'
import { DbAddCadeira } from '@/data/usecases'
import { type AddCadeira } from '@/domain/usecases'
import { CadeiraPrismaRepository } from '@/infra/db/prisma'

export const makeDbAddCadeira = (): AddCadeira => {
  const cadeiraPrismaRepository = new CadeiraPrismaRepository()
  return new DbAddCadeira(cadeiraPrismaRepository, makeDbCheckProfessorById())
}
