import { DbAddAluno } from '@/data/usecases'
import { type AddAluno } from '@/domain/usecases/add-aluno'
import { AlunoPrismaRepository } from '@/infra/db/prisma/aluno-prisma-repository'

export const makeDbAddAluno = (): AddAluno => {
  const alunoPrismaRepository = new AlunoPrismaRepository()
  return new DbAddAluno(alunoPrismaRepository)
}
