import { PrismaHelper } from '@/infra/db/prisma'
import app from '@/main/config/app'
import { mockAddCadeiraParams, mockAddProfessorParams } from '@/tests/domain'

import request from 'supertest'

describe('Cadeira Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  test('should return an cadeira on success', async () => {
    const professor = await request(app)
      .post('/api/professor')
      .send(mockAddProfessorParams())

    await request(app)
      .post('/api/cadeira')
      .send(Object.assign({}, mockAddCadeiraParams(), { professorId: professor.body.id }))
      .expect(200)
  })
})
