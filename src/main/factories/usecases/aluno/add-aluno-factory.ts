import { DbAddAluno } from '@/data/usecases'
import { type AddAluno } from '@/domain/usecases'
import { AlunoPrismaRepository } from '@/infra/db/prisma'

export const makeDbAddAluno = (): AddAluno => {
  const alunoPrismaRepository = new AlunoPrismaRepository()
  return new DbAddAluno(alunoPrismaRepository, alunoPrismaRepository)
}
