import { type AlunoModel } from '@/domain/models/aluno'
import { type AddAlunoParams } from '@/domain/usecases/add-aluno'

export interface AddAlunoRepository {
  add: (data: AddAlunoParams) => Promise<AlunoModel>
}
