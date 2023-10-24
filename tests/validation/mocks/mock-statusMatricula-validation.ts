import { type StatusMatriculaValidator } from '@/presentation/protocols'
import { type MatriculaStatus } from '@prisma/client'

export class StatusMatriculaValidatorSpy implements StatusMatriculaValidator {
  isStatusMatriculaValid = true
  data: MatriculaStatus

  isStatusMatricula (date: MatriculaStatus): boolean {
    this.data = date
    return this.isStatusMatriculaValid
  }
}
