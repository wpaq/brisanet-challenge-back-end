import { type ProfessorModel } from '@/domain/models'
import { type AddProfessor, type AddProfessorParams, type CheckProfessorById } from '@/domain/usecases'

export class AddProfessorSpy implements AddProfessor {
  addProfessorParams: AddProfessorParams
  result = true

  async add (data: AddProfessorParams): Promise<ProfessorModel | boolean> {
    this.addProfessorParams = data
    return this.result
  }
}

export class CheckProfessorByIdSpy implements CheckProfessorById {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}
