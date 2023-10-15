import { type Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  input: any
  error: Error | null = null

  validate (input: any): Error | null {
    this.input = input
    return this.error
  }
}
