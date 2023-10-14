import { type AlunoModel } from '@/domain/models/aluno'
import { type AddAlunoParams } from '@/domain/usecases/add-aluno'

export const mockAlunoModel = (): AlunoModel => ({
  id: 'valid_id',
  nome: 'valid_nome',
  telefone: '123456789',
  email: 'valid_email@mail.com',
  cpf: '12345678910',
  matricula: 'valid_matricula'
})

export const mockAddAlunoParams = (): AddAlunoParams => ({
  nome: 'valid_nome',
  telefone: '123456789',
  email: 'valid_email@mail.com',
  cpf: '12345678910',
  matricula: 'valid_matricula'
})
