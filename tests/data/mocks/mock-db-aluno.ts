import { mockAlunoModel } from '@/tests/domain/mock-aluno'

import { type CheckAlunoByEmailRepository, type AddAlunoRepository, type CheckAlunoByIdRepository } from '@/data/protocols'
import { type AlunoModel } from '@/domain/models'
import { type AddAlunoParams } from '@/domain/usecases'

export class AddAlunoRepositorySpy implements AddAlunoRepository {
  addAlunoParams: AddAlunoParams
  result = mockAlunoModel()

  async add (data: AddAlunoParams): Promise<AlunoModel> {
    this.addAlunoParams = data
    return this.result
  }
}

export class CheckAlunoByEmailRepositorySpy implements CheckAlunoByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}

export class CheckAlunoByIdRepositorySpy implements CheckAlunoByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}
