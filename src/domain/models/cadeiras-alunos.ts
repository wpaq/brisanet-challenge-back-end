import { type MatriculaStatus } from '@prisma/client'

export type CadeirasAlunosModel = {
  id: string
  alunoId: string
  cadeiraId: string
  professorId: string
  statusMatricula: MatriculaStatus
}
