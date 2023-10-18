import { type AlunoModel } from '@/domain/models'
import { type AddAluno, type AddAlunoParams } from '@/domain/usecases'

export class AddAlunoSpy implements AddAluno {
  addAlunoParams: AddAlunoParams
  result = true

  async add (data: AddAlunoParams): Promise<AlunoModel | boolean> {
    this.addAlunoParams = data
    return this.result
  }
}
