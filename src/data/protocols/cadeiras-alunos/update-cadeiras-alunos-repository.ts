import { type CadeirasAlunosModel } from '@/domain/models'
import { type UpdateCadeirasAlunosParams } from '@/domain/usecases'

export interface UpdateCadeirasAlunosRepository {
  update: (data: UpdateCadeirasAlunosParams) => Promise<CadeirasAlunosModel>
}
