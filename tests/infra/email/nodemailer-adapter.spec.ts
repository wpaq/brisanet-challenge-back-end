import { NodemailerAdapter } from '@/infra/email'
import { faker } from '@faker-js/faker'

const receiverEmail = faker.internet.email()
const senderEmail = faker.internet.email()
const senderName = faker.person.fullName()
const cadeiraName = faker.word.words()
const statusMatricula = faker.word.words()

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
      await sut.send(receiverEmail, senderEmail, senderName, cadeiraName, statusMatricula)

      const sendMailArgs = sendMailMock.mock.calls[0]
      expect(sendMailArgs[0].to).toBe(receiverEmail)
      expect(sendMailArgs[0].from).toBe(senderEmail)
      expect(sendMailArgs[0].text).toContain(senderName)
      expect(sendMailArgs[0].text).toContain(cadeiraName)
    })

    test('Should return true if sendMail return true', async () => {
      const sut = makeSut()
      const email = await sut.send(receiverEmail, senderEmail, senderName, cadeiraName, statusMatricula)

      expect(email).toBeTruthy()
    })

    test('Should throw if sendMail throws', async () => {
      const sut = makeSut()
      sendMailMock.mockRejectedValueOnce(new Error())

      const promise = sut.send(receiverEmail, senderEmail, senderName, cadeiraName, statusMatricula)
      await expect(promise).rejects.toThrow()
    })
  })
})
