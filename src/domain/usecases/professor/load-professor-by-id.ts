import { type ProfessorModel } from '@/domain/models'

export interface LoadProfessorById {
  loadById: (id: string) => Promise<ProfessorModel>
}
