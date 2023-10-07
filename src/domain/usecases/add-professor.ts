import { type ProfessorModel } from '@/domain/models/professor'

export type AddProfessorParams = {
  nome: string
  telefone: number
  email: string
  cpf: number
}

export interface AddProfessor {
  add: (data: AddProfessorParams) => Promise<ProfessorModel | null>
}
