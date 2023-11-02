import { AlunoPrismaRepository, CadeiraPrismaRepository, CadeirasAlunosPrismaRepository, PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'
import app from '@/main/config/app'

import { mockAddAlunoParams, mockAddCadeiraParams, mockAddProfessorParams } from '@/tests/domain'
import { prismock } from '@/tests/infra/db/mocks'

import request from 'supertest'

const sendMailMock = jest.fn()
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: sendMailMock
  }))
}))

let professorId: string
let alunoId: string
let cadeiraId: string

describe('CadeirasAlunos Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect(prismock)
    professorId = (await new ProfessorPrismaRepository().add(mockAddProfessorParams())).id
    alunoId = (await new AlunoPrismaRepository().add(mockAddAlunoParams())).id
    cadeiraId = (await new CadeiraPrismaRepository().add(Object.assign({}, mockAddCadeiraParams(), { professorId }))).id
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.client.aluno.deleteMany({})
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.client.cadeirasAlunos.deleteMany({})
    await PrismaHelper.disconnect(prismock)
  })

  test('should return an cadeiras alunos on success', async () => {
    await request(app)
      .post('/api/cadeiras-alunos')
      .send({
        alunoId,
        cadeiraId
      })
      .expect(200)
  })

  test('should return an cadeiras alunos on success update', async () => {
    const cadeirasAlunos = await new CadeirasAlunosPrismaRepository().add({ cadeiraId, alunoId, professorId })

    await request(app)
      .put('/api/cadeiras-alunos')
      .send({
        id: cadeirasAlunos.id,
        statusMatricula: 'Aprovado'
      })
      .expect(200)
  })
})
