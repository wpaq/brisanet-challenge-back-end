import { DbCheckCadeirasAlunosById } from '@/data/usecases'
import { type CheckCadeirasAlunosById } from '@/domain/usecases'
import { CadeirasAlunosPrismaRepository } from '@/infra/db/prisma'

export const makeDbCheckCadeirasAlunosById = (): CheckCadeirasAlunosById => {
  const cadeirasAlunosPrismaRepository = new CadeirasAlunosPrismaRepository()
  return new DbCheckCadeirasAlunosById(cadeirasAlunosPrismaRepository)
}
