import { PrismaHelper } from '@/infra/db/prisma'
import app from '@/main/config/app'

import request from 'supertest'

describe('Cadeira Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  test('should return an cadeira on success', async () => {
    const professor = await request(app)
      .post('/api/professor')
      .send({
        nome: 'Professor 1',
        telefone: '889885644444',
        email: 'professor1@mail.com',
        cpf: '000.000.000-70'
      })

    await request(app)
      .post('/api/cadeira')
      .send({
        nome: 'Informática',
        slug: 'informatica_ti',
        dataInicio: '10/05/2011',
        dataFim: '10/06/2012',
        cargaHoraria: 40,
        professorId: professor.body.id
      })
      .expect(200)
  })
})
