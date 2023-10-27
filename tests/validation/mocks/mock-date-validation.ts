import { type DateValidator } from '@/validation/protocols'

export class DateValidatorSpy implements DateValidator {
  isDateValid = true
  date: string

  isDate (date: string): boolean {
    this.date = date
    return this.isDateValid
  }
}
