import { type CadeirasAlunosModel } from '@/domain/models'
import { type MatriculaStatus } from '@prisma/client'

export type UpdateCadeirasAlunosParams = {
  id: string
  statusMatricula: MatriculaStatus
}

export interface UpdateCadeirasAlunos {
  update: (data: UpdateCadeirasAlunosParams) => Promise<CadeirasAlunosModel | boolean>
}
