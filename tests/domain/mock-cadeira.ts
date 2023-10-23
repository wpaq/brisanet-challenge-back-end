import { type CadeiraModel } from '@/domain/models'
import { type AddCadeiraParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockCadeiraModel = (): CadeiraModel => ({
  id: faker.string.uuid(),
  nome: faker.person.fullName(),
  slug: faker.word.words(),
  dataInicio: faker.date.recent(),
  dataFim: faker.date.future({ years: 1 }),
  cargaHoraria: faker.number.int({ max: 100 }),
  professorId: faker.string.uuid()
})

export const mockCadeiraModels = (): CadeiraModel[] => [
  mockCadeiraModel(),
  mockCadeiraModel()
]

export const mockAddCadeiraParams = (): AddCadeiraParams => ({
  nome: faker.person.fullName(),
  slug: faker.word.words(),
  dataInicio: faker.date.recent(),
  dataFim: faker.date.future({ years: 1 }),
  cargaHoraria: faker.number.int({ max: 100 }),
  professorId: faker.string.uuid()
})
