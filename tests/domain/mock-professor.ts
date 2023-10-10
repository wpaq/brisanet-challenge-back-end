import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessorParams } from '@/domain/usecases/add-professor'

export const mockProfessorModel = (): ProfessorModel => ({
  id: 'valid_id',
  nome: 'valid_nome',
  telefone: '123456789',
  email: 'valid_email@mail.com',
  cpf: '12345678910'
})

export const mockAddProfessorParams = (): AddProfessorParams => ({
  nome: 'valid_nome',
  telefone: '123456789',
  email: 'valid_email@mail.com',
  cpf: '12345678910'
})
