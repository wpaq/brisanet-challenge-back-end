import { DbCheckProfessorById } from '@/data/usecases'
import { type CheckProfessorById } from '@/domain/usecases'
import { ProfessorPrismaRepository } from '@/infra/db/prisma'

export const makeDbCheckProfessorById = (): CheckProfessorById => {
  const professorPrismaRepository = new ProfessorPrismaRepository()
  return new DbCheckProfessorById(professorPrismaRepository)
}
