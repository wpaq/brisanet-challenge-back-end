import { type StatusMatriculaValidator } from '@/presentation/protocols'
import { type MatriculaStatus } from '@prisma/client'

export class StatusMatriculaValidatorSpy implements StatusMatriculaValidator {
  isStatusMatriculaValid = true
  date: MatriculaStatus

  isStatusMatricula (date: MatriculaStatus): boolean {
    this.date = date
    return this.isStatusMatriculaValid
  }
}
