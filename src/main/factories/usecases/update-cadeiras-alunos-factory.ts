import { DbUpdateCadeirasAlunos } from '@/data/usecases'
import { type UpdateCadeirasAlunos } from '@/domain/usecases'
import { CadeirasAlunosPrismaRepository } from '@/infra/db/prisma'
import { makeDbCheckCadeirasAlunosById } from './check-cadeiras-alunos-by-id-factory'

export const makeDbUpdateCadeirasAlunos = (): UpdateCadeirasAlunos => {
  const cadeirasAlunosPrismaRepository = new CadeirasAlunosPrismaRepository()
  return new DbUpdateCadeirasAlunos(cadeirasAlunosPrismaRepository, makeDbCheckCadeirasAlunosById())
}
