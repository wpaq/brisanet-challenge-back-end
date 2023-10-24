import { DbCheckAlunoById } from '@/data/usecases'
import { type CheckAlunoById } from '@/domain/usecases'
import { AlunoPrismaRepository } from '@/infra/db/prisma'

export const makeDbCheckAlunoById = (): CheckAlunoById => {
  const alunoPrismaRepository = new AlunoPrismaRepository()
  return new DbCheckAlunoById(alunoPrismaRepository)
}
