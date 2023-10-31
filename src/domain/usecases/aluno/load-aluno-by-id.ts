import { type AlunoModel } from '@/domain/models'

export interface LoadAlunoById {
  loadById: (id: string) => Promise<AlunoModel>
}
