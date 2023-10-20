import { type DateValidator } from '@/validation/protocols'

import validator from 'validator'

export class DateValidatorAdapter implements DateValidator {
  isDate (date: string): boolean {
    return validator.matches(date, /^(?:\d{4}-\d{2}-\d{2})$/) || validator.isISO8601(date)
  }
}
