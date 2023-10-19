import { AlunoPrismaRepository, CadeiraPrismaRepository, PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'
import app from '@/main/config/app'
import { mockAddAlunoParams, mockAddCadeiraParams, mockAddProfessorParams } from '@/tests/domain'

import request from 'supertest'

let aluno, cadeira

describe('CadeirasAlunos Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')

    const professor = await new ProfessorPrismaRepository().add(mockAddProfessorParams())
    aluno = await new AlunoPrismaRepository().add(mockAddAlunoParams())
    cadeira = await new CadeiraPrismaRepository().add(Object.assign({}, mockAddCadeiraParams(), { professorId: professor.id }))
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.client.aluno.deleteMany({})
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  test('should return an cadeira on success', async () => {
    await request(app)
      .post('/api/cadeiras-alunos')
      .send({
        alunoId: aluno.id,
        cadeiraId: cadeira.id
      })
      .expect(200)
  })
})
