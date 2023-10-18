import { type CheckAlunoByEmailRepository, type AddAlunoRepository } from '@/data/protocols'
import { type AlunoModel } from '@/domain/models/aluno'
import { type AddAlunoParams } from '@/domain/usecases/add-aluno'
import { mockAlunoModel } from '@/tests/domain/mock-aluno'

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
