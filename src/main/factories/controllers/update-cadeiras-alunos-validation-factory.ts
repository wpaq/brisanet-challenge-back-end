import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeUpdateCadeirasAlunosValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'statusMatricula']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
