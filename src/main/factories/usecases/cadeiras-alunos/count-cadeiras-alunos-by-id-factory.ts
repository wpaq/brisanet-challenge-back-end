import { DbCountCadeirasAlunosById } from '@/data/usecases'
import { type CountCadeirasAlunosById } from '@/domain/usecases'
import { CadeirasAlunosPrismaRepository } from '@/infra/db/prisma'

export const makeDbCountCadeirasAlunosById = (): CountCadeirasAlunosById => {
  const cadeirasAlunosPrismaRepository = new CadeirasAlunosPrismaRepository()
  return new DbCountCadeirasAlunosById(cadeirasAlunosPrismaRepository)
}
