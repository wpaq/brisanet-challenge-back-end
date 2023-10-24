import { EmailValidatorAdapter } from '@/infra/validators'
import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators'

export const makeAlunoValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['nome', 'telefone', 'email', 'cpf', 'matricula']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
