import { mockAddProfessorParams } from '@/tests/domain/mock-professor'
import { mockAddCadeiraParams } from '@/tests/domain/mock-cadeira'
import { CadeiraPrismaRepository, PrismaHelper, ProfessorPrismaRepository } from '@/infra/db/prisma'

describe('CadeiraPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect('test')
  })

  afterAll(async () => {
    await PrismaHelper.client.cadeira.deleteMany({})
    await PrismaHelper.client.professor.deleteMany({})
    await PrismaHelper.disconnect('test')
  })

  test('Should return an cadeira on success', async () => {
    const sut = new CadeiraPrismaRepository()
    const professorRepository = new ProfessorPrismaRepository()
    const addCadeiraParams = mockAddCadeiraParams()
    const professor = await professorRepository.add(mockAddProfessorParams())
    const result = await sut.add(Object.assign({}, addCadeiraParams, { professorId: professor.id }))

    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.nome).toBe(addCadeiraParams.nome)
    expect(result.slug).toBe(addCadeiraParams.slug)
    expect(result.dataInicio).toEqual(addCadeiraParams.dataInicio)
    expect(result.dataFim).toEqual(addCadeiraParams.dataFim)
    expect(result.cargaHoraria).toBe(addCadeiraParams.cargaHoraria)
    expect(result.professorId).toBe(professor.id)
  })
})
