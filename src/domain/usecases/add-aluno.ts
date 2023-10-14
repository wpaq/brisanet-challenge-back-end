import { type AlunoModel } from '../models/aluno'

type AlunoParams = {
  nome: string
  telefone: string
  email: string
  cpf: string
  matricula: string
}

export interface AddAluno {
  add: (data: AlunoParams) => Promise<AlunoModel>
}
