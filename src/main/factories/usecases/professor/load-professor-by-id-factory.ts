import { DbLoadProfessorById } from '@/data/usecases'
import { type LoadProfessorById } from '@/domain/usecases'
import { ProfessorPrismaRepository } from '@/infra/db/prisma'

export const makeDbLoadProfessorById = (): LoadProfessorById => {
  const professorPrismaRepository = new ProfessorPrismaRepository()
  return new DbLoadProfessorById(professorPrismaRepository)
}
