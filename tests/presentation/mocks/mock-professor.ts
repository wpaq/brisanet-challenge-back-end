import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessor, type AddProfessorParams } from '@/domain/usecases/add-professor'
import { mockProfessorModel } from '@/tests/domain/mock-professor'

export class AddProfessorSpy implements AddProfessor {
  addProfessorParams: AddProfessorParams
  professorModel = mockProfessorModel() || null

  async add (data: AddProfessorParams): Promise<ProfessorModel | null> {
    this.addProfessorParams = data
    return await Promise.resolve(this.professorModel)
  }
}
