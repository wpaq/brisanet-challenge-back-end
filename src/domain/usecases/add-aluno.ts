import { type AlunoModel } from '../models/aluno'

export type AddAlunoParams = {
  nome: string
  telefone: string
  email: string
  cpf: string
  matricula: string
}

export interface AddAluno {
  add: (data: AddAlunoParams) => Promise<AlunoModel>
}
