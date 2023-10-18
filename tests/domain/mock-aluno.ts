import { type AlunoModel } from '@/domain/models'
import { type AddAlunoParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockAlunoModel = (): AlunoModel => ({
  id: faker.string.uuid(),
  nome: faker.person.fullName(),
  telefone: faker.phone.number(),
  email: faker.internet.email(),
  cpf: faker.string.numeric(11),
  matricula: faker.string.numeric(6)
})

export const mockAddAlunoParams = (): AddAlunoParams => ({
  nome: faker.person.fullName(),
  telefone: faker.phone.number(),
  email: faker.internet.email(),
  cpf: faker.string.numeric(11),
  matricula: faker.string.numeric(6)
})
