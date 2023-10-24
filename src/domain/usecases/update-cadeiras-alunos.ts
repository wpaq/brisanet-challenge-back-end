import { type CadeirasAlunosModel } from '@/domain/models'

export type UpdateCadeirasAlunosParams = {
  id: string
  statusMatricula: MatriculaStatus
}

export interface UpdateCadeirasAlunos {
  update: (data: UpdateCadeirasAlunosParams) => Promise<CadeirasAlunosModel | boolean>
}

enum MatriculaStatus {
  Pendente,
  Aprovado,
  Rejeitado
}
