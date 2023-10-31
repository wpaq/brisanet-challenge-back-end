import { type AlunoModel } from '@/domain/models'

export interface LoadAlunoByIdRepository {
  loadById: (id: string) => Promise<AlunoModel>
}
