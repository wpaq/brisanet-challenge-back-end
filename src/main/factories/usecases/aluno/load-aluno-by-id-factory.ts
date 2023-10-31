import { DbLoadAlunoById } from '@/data/usecases'
import { type LoadAlunoById } from '@/domain/usecases'
import { AlunoPrismaRepository } from '@/infra/db/prisma'

export const makeDbLoadAlunoById = (): LoadAlunoById => {
  const alunoPrismaRepository = new AlunoPrismaRepository()
  return new DbLoadAlunoById(alunoPrismaRepository)
}
