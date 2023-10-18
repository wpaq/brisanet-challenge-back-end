import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeCadeiraValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['nome', 'slug', 'dataInicio', 'dataFim', 'cargaHoraria', 'professorId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
