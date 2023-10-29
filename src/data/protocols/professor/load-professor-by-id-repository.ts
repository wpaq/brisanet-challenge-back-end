import { type ProfessorModel } from '@/domain/models'

export interface LoadProfessorByIdRepository {
  loadById: (id: string) => Promise<ProfessorModel>
}
