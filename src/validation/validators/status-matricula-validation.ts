import { type Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

import { MatriculaStatus } from '@prisma/client'

export class StatusMatriculaValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | null {
    const matriculaStatusValues = Object.values(MatriculaStatus)
    if (!matriculaStatusValues.includes(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
