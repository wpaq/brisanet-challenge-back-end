import { ProfessorController } from '@/presentation/controllers/index'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'

describe('Professor Controller', () => {
  test('Should return 400 if no /nome/ is provided', async () => {
    const sut = new ProfessorController()
    const httpRequest = {
      body: {
        // nome: 'any_nome',
        telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('nome')))
  })

  test('Should return 400 if no /telefone/ is provided', async () => {
    const sut = new ProfessorController()
    const httpRequest = {
      body: {
        nome: 'any_nome',
        // telefone: 123456789,
        email: 'any_email@mail.com',
        cpf: 12345678910
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('telefone')))
  })
})
