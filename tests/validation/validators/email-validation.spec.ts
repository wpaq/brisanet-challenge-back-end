import { EmailValidatorSpy } from '@/tests/validation/mocks'

import { EmailValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

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

  test('Should throws if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
