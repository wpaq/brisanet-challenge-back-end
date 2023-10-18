import { type ProfessorModel } from '@/domain/models'
import { type AddProfessorParams } from '@/domain/usecases'

export interface AddProfessorRepository {
  add: (data: AddProfessorParams) => Promise<ProfessorModel>
}
