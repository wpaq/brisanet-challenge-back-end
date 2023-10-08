import { type ProfessorModel } from '@/domain/models/professor'

export const mockProfessorModel = (): ProfessorModel => ({
  id: 'valid_id',
  nome: 'valid_name',
  telefone: 123456789,
  email: 'valid_email@mail.com',
  cpf: 12345678910
})
