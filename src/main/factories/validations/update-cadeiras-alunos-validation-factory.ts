import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, StatusMatriculaValidation } from '@/validation/validators'

export const makeUpdateCadeirasAlunosValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'statusMatricula']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new StatusMatriculaValidation('statusMatricula'))
  return new ValidationComposite(validations)
}
