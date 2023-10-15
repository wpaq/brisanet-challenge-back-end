import { mockProfessorModel } from '@/tests/domain/mock-professor'
import { type AddProfessorRepository } from '@/data/protocols'
import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessorParams } from '@/domain/usecases/add-professor'

export class AddProfessorRepositorySpy implements AddProfessorRepository {
  addProfessorParams: AddProfessorParams
  result = mockProfessorModel()

  async add (data: AddProfessorParams): Promise<ProfessorModel> {
    this.addProfessorParams = data
    return this.result
  }
}
