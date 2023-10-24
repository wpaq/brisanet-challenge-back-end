import { DbUpdateCadeirasAlunos } from '@/data/usecases'
import { type UpdateCadeirasAlunos } from '@/domain/usecases'
import { CadeirasAlunosPrismaRepository } from '@/infra/db/prisma'

export const makeDbUpdateCadeirasAlunos = (): UpdateCadeirasAlunos => {
  const cadeirasAlunosPrismaRepository = new CadeirasAlunosPrismaRepository()
  return new DbUpdateCadeirasAlunos(cadeirasAlunosPrismaRepository)
}
