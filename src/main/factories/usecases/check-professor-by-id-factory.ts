import { DbCheckProfessorById } from '@/data/usecases/db-check-professor-by-id'
import { type CheckProfessorById } from '@/domain/usecases/check-professor-by-id'
import { ProfessorPrismaRepository } from '@/infra/db/prisma'

export const makeDbCheckProfessorById = (): CheckProfessorById => {
  const professorPrismaRepository = new ProfessorPrismaRepository()
  return new DbCheckProfessorById(professorPrismaRepository)
}
