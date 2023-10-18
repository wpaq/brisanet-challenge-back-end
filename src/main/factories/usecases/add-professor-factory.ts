import { DbAddProfessor } from '@/data/usecases'
import { type AddProfessor } from '@/domain/usecases'
import { ProfessorPrismaRepository } from '@/infra/db/prisma'

export const makeDbAddProfessor = (): AddProfessor => {
  const professorPrismaRepository = new ProfessorPrismaRepository()
  return new DbAddProfessor(professorPrismaRepository, professorPrismaRepository)
}
