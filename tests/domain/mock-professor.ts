import { type ProfessorModel } from '@/domain/models'
import { type AddProfessorParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockProfessorModel = (): ProfessorModel => ({
  id: faker.string.uuid(),
  nome: faker.person.fullName(),
  telefone: faker.phone.number(),
  email: faker.internet.email(),
  cpf: faker.string.numeric(11)
})

export const mockAddProfessorParams = (): AddProfessorParams => ({
  nome: faker.person.fullName(),
  telefone: faker.phone.number(),
  email: faker.internet.email(),
  cpf: faker.string.numeric(11)
})
