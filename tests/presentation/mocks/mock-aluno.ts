import { type AlunoModel } from '@/domain/models'
import { type CheckAlunoById, type AddAluno, type AddAlunoParams } from '@/domain/usecases'

export class AddAlunoSpy implements AddAluno {
  addAlunoParams: AddAlunoParams
  result = true

  async add (data: AddAlunoParams): Promise<AlunoModel | boolean> {
    this.addAlunoParams = data
    return this.result
  }
}

export class CheckAlunoByIdSpy implements CheckAlunoById {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}
