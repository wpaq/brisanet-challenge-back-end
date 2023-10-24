import { StatusMatriculaValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

import { faker } from '@faker-js/faker'

const field = 'APROVADO'

const makeSut = (): StatusMatriculaValidation => {
  return new StatusMatriculaValidation(field)
}

describe('StatusMatricula Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const invalidField = faker.word.words()
    const error = sut.validate({ [field]: invalidField.toUpperCase() })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: field })
    expect(error).toBeFalsy()
  })
})
