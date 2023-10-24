import { type CadeirasAlunosModel } from '@/domain/models'
import { type AddCadeirasAlunosParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockCadeirasAlunosModel = (): CadeirasAlunosModel => ({
  id: faker.string.uuid(),
  alunoId: faker.string.uuid(),
  cadeiraId: faker.string.uuid(),
  professorId: faker.string.uuid()
})

export const mockAddCadeirasAlunosParams = (): AddCadeirasAlunosParams => ({
  alunoId: faker.string.uuid(),
  cadeiraId: faker.string.uuid(),
  professorId: faker.string.uuid()
})
