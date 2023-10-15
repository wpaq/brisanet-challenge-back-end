import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeProfessorValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['nome', 'telefone', 'email', 'cpf']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
