import { type AddCadeiraParams } from './usecases/add-cadeira'
import { type CadeiraModel } from './models/cadeira'

import { faker } from '@faker-js/faker'

export const mockCadeiraModel = (): CadeiraModel => ({
  id: faker.string.uuid(),
  nome: faker.person.fullName(),
  slug: faker.word.words(),
  data_inicio: faker.date.anytime(),
  data_fim: faker.date.anytime(),
  carga_horaria: faker.number.int(),
  professor_id: faker.string.uuid()
})

export const mockAddCadeiraParams = (): AddCadeiraParams => ({
  nome: faker.person.fullName(),
  slug: faker.word.words(),
  data_inicio: faker.date.anytime(),
  data_fim: faker.date.anytime(),
  carga_horaria: faker.number.int(),
  professor_id: faker.string.uuid()
})
