import { AlunoPrismaRepository, CadeiraPrismaRepository, PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'
import app from '@/main/config/app'
import { mockAddAlunoParams, mockAddCadeiraParams, mockAddProfessorParams } from '@/tests/domain'

import request from 'supertest'

describe('CadeirasAlunos Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connectPrismock()
  })

  afterAll(async () => {
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.client.aluno.deleteMany({})
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.disconnectPrismock()
  })

  test('should return an cadeiras alunos on success', async () => {
    const professor = await new ProfessorPrismaRepository().add(mockAddProfessorParams())
    const aluno = await new AlunoPrismaRepository().add(mockAddAlunoParams())
    const cadeira = await request(app)
      .post('/api/cadeira')
      .send(Object.assign({}, mockAddCadeiraParams(), { professorId: professor.id }))
      .expect(200)

    await request(app)
      .post('/api/cadeiras-alunos')
      .send({
        alunoId: aluno.id,
        cadeiraId: cadeira.body.id
      })
      .expect(200)
  })

  test('should return an cadeiras alunos on success update', async () => {
    const professor = await new ProfessorPrismaRepository().add(mockAddProfessorParams())
    const cadeira = await new CadeiraPrismaRepository().add(Object.assign({}, mockAddCadeiraParams(), { professorId: professor.id }))

    await request(app)
      .put('/api/cadeiras-alunos')
      .send({
        id: cadeira.id,
        statusMatricula: 'Aprovado'
      })
      .expect(200)
  })
})
