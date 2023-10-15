import { mockProfessorModel } from '@/tests/domain/mock-professor'
import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessor, type AddProfessorParams } from '@/domain/usecases/add-professor'

export class AddProfessorSpy implements AddProfessor {
  addProfessorParams: AddProfessorParams
  result = mockProfessorModel()

  async add (data: AddProfessorParams): Promise<ProfessorModel> {
    this.addProfessorParams = data
    return this.result
  }
}
