import { EmailValidatorAdapter } from '@/infra/validators'
import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators'

export const makeProfessorValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['nome', 'telefone', 'email', 'cpf']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
