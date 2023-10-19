import { type CadeirasAlunosModel } from '@/domain/models'
import { type AddCadeirasAlunosParams } from '@/domain/usecases'

export interface AddCadeiraRepository {
  add: (data: AddCadeirasAlunosParams) => Promise<CadeirasAlunosModel>
}
