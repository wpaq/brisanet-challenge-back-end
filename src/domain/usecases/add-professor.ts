import { type ProfessorModel } from '../models/professor'

export type AddProfessorParams = {
  nome: string
  telefone: string
  email: string
  cpf: string
}

export interface AddProfessor {
  add: (data: AddProfessorParams) => Promise<ProfessorModel>
}
