import { PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'
import app from '@/main/config/app'

import { mockAddCadeiraParams, mockAddProfessorParams } from '@/tests/domain'
import { prismock } from '@/tests/infra/db/mocks'

import request from 'supertest'

describe('Cadeira Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect(prismock)
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.disconnect(prismock)
  })

  test('should return an cadeira on success', async () => {
    const professorId = (await new ProfessorPrismaRepository().add(mockAddProfessorParams())).id

    await request(app)
      .post('/api/cadeira')
      .send(Object.assign({}, mockAddCadeiraParams(), { professorId }))
      .expect(200)
  })

  test('should return an list of cadeiras on success', async () => {
    await request(app)
      .get('/api/cadeiras')
      .expect(200)
  })
})
