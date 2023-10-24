import { type CadeirasAlunosModel } from '@/domain/models'

export type UpdateCadeirasAlunosParams = {
  id: string
  statusMatricula: string
}

export interface UpdateCadeirasAlunos {
  update: (data: UpdateCadeirasAlunosParams) => Promise<CadeirasAlunosModel | boolean>
}
