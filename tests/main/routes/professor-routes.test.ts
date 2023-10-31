import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/prisma'

import { prismock } from '@/tests/infra/db/mocks'

import request from 'supertest'

describe('Professor Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect(prismock)
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.disconnect(prismock)
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
