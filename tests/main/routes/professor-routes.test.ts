import app from '@/main/config/app'
import request from 'supertest'
import { PrismaHelper } from '@/infra/db/prisma'

describe('Professor Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  beforeEach(async () => {
    await PrismaHelper.client.professor.deleteMany({})
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
