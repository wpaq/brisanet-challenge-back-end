import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/prisma'
import request from 'supertest'

describe('Professor Routes', () => {
  beforeEach(async () => {
    await PrismaHelper.deleteMany()
  })

  test('should return an professor on success', async () => {
    await request(app)
      .post('/api/professor')
      .send({
        nome: 'Professor 1',
        telefone: '889885644444',
        email: 'professor1@mail.com',
        cpf: '000.000.000-70'
      })
      .expect(200)
  })
})
