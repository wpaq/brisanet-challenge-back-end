import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessor, type AddProfessorParams } from '@/domain/usecases/add-professor'

export class AddProfessorSpy implements AddProfessor {
  addProfessorParams: AddProfessorParams
  result = true

  async add (data: AddProfessorParams): Promise<ProfessorModel | boolean> {
    this.addProfessorParams = data
    return this.result
  }
}
