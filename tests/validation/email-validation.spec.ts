import { InvalidParamError } from '@/presentation/errors'
import { EmailValidatorSpy } from '@/tests/validation/mocks/mock-email-validation'
import { EmailValidation } from '@/validation/validators/email-validation'

const field = 'any_field'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const email = 'invalid_email@mail.com'
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = 'any_email@mail.com'
    sut.validate({ [field]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })
})
