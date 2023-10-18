import { type DateValidator } from '@/validation/protocols'

import validator from 'validator'

export class DateValidatorAdapter implements DateValidator {
  isDate (date: string): boolean {
    return validator.matches(date, /^\d{2}\/\d{2}\/\d{4}$/)
  }
}
