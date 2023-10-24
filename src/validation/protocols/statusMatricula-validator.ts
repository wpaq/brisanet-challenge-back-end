import { type MatriculaStatus } from '@prisma/client'

export interface StatusMatriculaValidator {
  isStatusMatricula: (date: MatriculaStatus) => boolean
}
