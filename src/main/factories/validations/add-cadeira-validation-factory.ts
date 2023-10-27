import { DateValidatorAdapter } from '@/infra/validators'
import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, DateValidation } from '@/validation/validators'

export const makeAddCadeiraValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['nome', 'slug', 'dataInicio', 'dataFim', 'cargaHoraria', 'professorId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const field of ['dataInicio', 'dataFim']) {
    validations.push(new DateValidation(field, new DateValidatorAdapter()))
  }

  return new ValidationComposite(validations)
}
