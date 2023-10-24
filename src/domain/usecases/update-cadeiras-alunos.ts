import { type CadeirasAlunosModel } from '@/domain/models'

export type UpdateCadeirasAlunosParams = {
  id: string
  statusMatricula: MatriculaStatus
}

export interface UpdateCadeirasAlunos {
  update: (data: UpdateCadeirasAlunosParams) => Promise<CadeirasAlunosModel | boolean>
}

export enum MatriculaStatus {
  Pendente,
  Aprovado,
  Rejeitado
}
