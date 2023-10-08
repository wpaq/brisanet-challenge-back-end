import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessorParams } from '@/domain/usecases/add-professor'

export interface AddProfessorRepository {
  add: (data: AddProfessorParams) => Promise<ProfessorModel>
}
