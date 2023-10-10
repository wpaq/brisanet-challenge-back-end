import { EmailValidatorAdapter } from '@/infra/validators'

export const makeEmailValidator = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}
