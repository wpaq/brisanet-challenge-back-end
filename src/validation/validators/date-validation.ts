import { type DateValidator } from '@/validation/protocols'
import { type Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class DateValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator
  ) {}

  validate (input: any): Error | null {
    const isValid = this.dateValidator.isDate(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
