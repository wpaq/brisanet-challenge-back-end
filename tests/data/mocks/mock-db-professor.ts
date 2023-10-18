import { mockProfessorModel } from '@/tests/domain/mock-professor'
import { type CheckProfessorByEmailRepository, type AddProfessorRepository } from '@/data/protocols'
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

export class CheckProfessorByEmailRepositorySpy implements CheckProfessorByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}
