import { InvalidParamError } from '@/presentation/errors'
import { DateValidatorSpy } from '@/tests/validation/mocks/mock-date-validation'
import { DateValidation } from '@/validation/validators'

const field = 'any_field'

type SutTypes = {
  sut: DateValidation
  dateValidatorSpy: DateValidatorSpy
}

const makeSut = (): SutTypes => {
  const dateValidatorSpy = new DateValidatorSpy()
  const sut = new DateValidation(field, dateValidatorSpy)
  return {
    sut,
    dateValidatorSpy
  }
}

describe('Date Validation', () => {
  test('Should return an error if DateValidator returns false', () => {
    const { sut, dateValidatorSpy } = makeSut()
    dateValidatorSpy.isDateValid = false
    const date = '10/05/2001'
    const error = sut.validate({ [field]: date })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should call DateValidator with correct date', () => {
    const { sut, dateValidatorSpy } = makeSut()
    const date = '00/00/000'
    sut.validate({ [field]: date })
    expect(dateValidatorSpy.date).toBe(date)
  })
})
