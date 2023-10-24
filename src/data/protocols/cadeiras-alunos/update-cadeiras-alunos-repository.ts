import { type CadeirasAlunosModel } from '@/domain/models'
import { type MatriculaStatus } from '@/domain/usecases'

export interface UpdateCadeirasAlunosRepository {
  update: (id: string, statusMatricula: MatriculaStatus) => Promise<CadeirasAlunosModel | boolean>
}
