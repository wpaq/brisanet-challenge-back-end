import { type CadeirasAlunosModel } from '@/domain/models'
import { type UpdateCadeirasAlunosParams, type AddCadeirasAlunosParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockCadeirasAlunosModel = (): CadeirasAlunosModel => ({
  id: faker.string.uuid(),
  alunoId: faker.string.uuid(),
  cadeiraId: faker.string.uuid(),
  professorId: faker.string.uuid(),
  statusMatricula: faker.word.words()
})

export const mockAddCadeirasAlunosParams = (): AddCadeirasAlunosParams => ({
  alunoId: faker.string.uuid(),
  cadeiraId: faker.string.uuid(),
  professorId: faker.string.uuid()
})

export const mockUpdateCadeirasAlunosParams = (): UpdateCadeirasAlunosParams => ({
  id: faker.string.uuid(),
  statusMatricula: faker.word.words()
})
