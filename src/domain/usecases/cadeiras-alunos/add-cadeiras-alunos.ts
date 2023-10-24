import { type CadeirasAlunosModel } from '@/domain/models'

export type AddCadeirasAlunosParams = {
  alunoId: string
  cadeiraId: string
  professorId: string
}

export interface AddCadeirasAlunos {
  add: (data: AddCadeirasAlunosParams) => Promise<CadeirasAlunosModel | boolean>
}
