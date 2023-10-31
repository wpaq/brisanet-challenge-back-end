import { NodemailerAdapter } from '@/infra/email'
import { faker } from '@faker-js/faker'

const to = faker.internet.email()
const from = faker.internet.email()

const sendMailMock = jest.fn()
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: sendMailMock
  }))
}))

const makeSut = (): NodemailerAdapter => {
  return new NodemailerAdapter()
}

beforeEach(() => {
  sendMailMock.mockClear()
})

describe('NodemailerAdapter', () => {
  describe('sendMail()', () => {
    test('Should call sendEmail with correct values', async () => {
      const sut = makeSut()
      await sut.send(to, from)

      const sendMailArgs = sendMailMock.mock.calls[0]
      expect(sendMailArgs[0].to).toBe(to)
      expect(sendMailArgs[0].from).toBe(from)
    })

    test('Should return true if sendMail return true', async () => {
      const sut = makeSut()
      const email = await sut.send(to, from)

      expect(email).toBeTruthy()
    })
  })
})
