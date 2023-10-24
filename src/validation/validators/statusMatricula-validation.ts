import { type StatusMatriculaValidator } from '@/validation/protocols'
import { type Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class StatusMatriculaValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly statusMatriculaValidator: StatusMatriculaValidator
  ) {}

  validate (input: any): Error | null {
    const isValid = this.statusMatriculaValidator.isStatusMatricula(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
