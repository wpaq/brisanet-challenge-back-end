import app from '@/main/config/app'
import request from 'supertest'
import { PrismaHelper } from '@/infra/db/prisma'

describe('Aluno Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.aluno.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  beforeEach(async () => {
    await PrismaHelper.client.aluno.deleteMany({})
  })

  test('should return an aluno on success', async () => {
    await request(app)
      .post('/api/aluno')
      .send({
        nome: 'Aluno 1',
        telefone: '889885644444',
        email: 'aluno1@mail.com',
        cpf: '000.000.000-70',
        matricula: '1570439787'
      })
      .expect(200)
  })
})
