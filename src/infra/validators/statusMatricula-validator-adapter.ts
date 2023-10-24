import { type StatusMatriculaValidator } from '@/validation/protocols'
import { MatriculaStatus } from '@prisma/client'

export class StatusMatriculaValidatorAdapter implements StatusMatriculaValidator {
  isStatusMatricula (data: MatriculaStatus): boolean {
    return [
      MatriculaStatus.Pendente,
      MatriculaStatus.Aprovado,
      MatriculaStatus.Rejeitado
    ].includes(data)
  }
}
