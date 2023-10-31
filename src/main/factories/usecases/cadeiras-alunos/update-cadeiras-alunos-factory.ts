import { DbUpdateCadeirasAlunos } from '@/data/usecases'
import { type UpdateCadeirasAlunos } from '@/domain/usecases'
import { CadeirasAlunosPrismaRepository } from '@/infra/db/prisma'
import { makeDbCheckCadeirasAlunosById, makeDbLoadAlunoById, makeDbLoadCadeiraById, makeDbLoadProfessorById } from '@/main/factories/usecases'
import { NodemailerAdapter } from '@/infra/email'

export const makeDbUpdateCadeirasAlunos = (): UpdateCadeirasAlunos => {
  const nodemailerAdapter = new NodemailerAdapter()
  const cadeirasAlunosPrismaRepository = new CadeirasAlunosPrismaRepository()
  return new DbUpdateCadeirasAlunos(
    cadeirasAlunosPrismaRepository,
    makeDbCheckCadeirasAlunosById(),
    makeDbLoadProfessorById(),
    makeDbLoadAlunoById(),
    nodemailerAdapter,
    makeDbLoadCadeiraById()
  )
}
