import { type AddCadeiraParams } from './usecases/add-cadeira'
import { type CadeiraModel } from './models/cadeira'

import { faker } from '@faker-js/faker'

export const mockCadeiraModel = (): CadeiraModel => ({
  id: faker.string.uuid(),
  nome: faker.person.fullName(),
  slug: faker.word.words(),
  dataInicio: new Date('2023-10-16'),
  dataFim: new Date('2023-11-16'),
  cargaHoraria: faker.number.int({ max: 100 }),
  professorId: faker.string.uuid()
})

export const mockAddCadeiraParams = (): AddCadeiraParams => ({
  nome: faker.person.fullName(),
  slug: faker.word.words(),
  dataInicio: new Date('2023-10-16'),
  dataFim: new Date('2023-11-16'),
  cargaHoraria: faker.number.int({ max: 100 }),
  professorId: faker.string.uuid()
})
