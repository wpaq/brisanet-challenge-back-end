import { type AddProfessorRepository } from '@/data/protocols'
import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessorParams } from '@/domain/usecases/add-professor'

export class AddProfessorRepositorySpy implements AddProfessorRepository {
  addProfessorParams: AddProfessorParams
  professorModel: ProfessorModel

  async add (data: AddProfessorParams): Promise<ProfessorModel> {
    this.addProfessorParams = data
    return this.professorModel
  }
}
