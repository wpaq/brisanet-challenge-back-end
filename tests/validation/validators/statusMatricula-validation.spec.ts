import { StatusMatriculaValidatorSpy } from '@/tests/validation/mocks'

import { StatusMatriculaValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'

const field = faker.word.words()

type SutTypes = {
  sut: StatusMatriculaValidation
  statusMatriculaValidatorSpy: StatusMatriculaValidatorSpy
}

const makeSut = (): SutTypes => {
  const statusMatriculaValidatorSpy = new StatusMatriculaValidatorSpy()
  const sut = new StatusMatriculaValidation(field, statusMatriculaValidatorSpy)
  return {
    sut,
    statusMatriculaValidatorSpy
  }
}

describe('StatusMatricula Validation', () => {
  test('Should return an error if StatusMatriculaValidator returns false', () => {
    const { sut, statusMatriculaValidatorSpy } = makeSut()
    statusMatriculaValidatorSpy.isStatusMatriculaValid = false
    const invalidField = faker.word.words()
    const error = sut.validate({ [field]: invalidField })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should call StatusMatriculaValidator with correct data', () => {
    const { sut, statusMatriculaValidatorSpy } = makeSut()
    sut.validate({ [field]: field })
    expect(statusMatriculaValidatorSpy.data).toBe(field)
  })
})
