import { mockProfessorModel } from '@/tests/domain'

import { type CheckProfessorByEmailRepository, type AddProfessorRepository, type CheckProfessorByIdRepository, type LoadProfessorByIdRepository } from '@/data/protocols'
import { type ProfessorModel } from '@/domain/models'
import { type AddProfessorParams } from '@/domain/usecases'

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

export class CheckProfessorByIdRepositorySpy implements CheckProfessorByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class LoadProfessorByIdRepositorySpy implements LoadProfessorByIdRepository {
  id: string
  result = mockProfessorModel()

  async loadById (id: string): Promise<ProfessorModel> {
    this.id = id
    return this.result
  }
}
