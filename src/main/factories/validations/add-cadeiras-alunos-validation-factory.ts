import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeAddCadeirasAlunosValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['alunoId', 'cadeiraId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
