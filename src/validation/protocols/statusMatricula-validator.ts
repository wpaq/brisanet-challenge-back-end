import { type MatriculaStatus } from '@prisma/client'

export interface StatusMatriculaValidator {
  isStatusMatricula: (data: MatriculaStatus) => boolean
}
