import { type AlunoModel } from '@/domain/models/aluno'
import { type AddAluno, type AddAlunoParams } from '@/domain/usecases/add-aluno'

export class AddAlunoSpy implements AddAluno {
  addAlunoParams: AddAlunoParams
  alunoModel: AlunoModel

  async add (data: AddAlunoParams): Promise<AlunoModel> {
    this.addAlunoParams = data
    return this.alunoModel
  }
}
