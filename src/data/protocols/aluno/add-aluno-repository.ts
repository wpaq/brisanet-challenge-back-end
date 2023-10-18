import { type AlunoModel } from '@/domain/models'
import { type AddAlunoParams } from '@/domain/usecases'

export interface AddAlunoRepository {
  add: (data: AddAlunoParams) => Promise<AlunoModel>
}
