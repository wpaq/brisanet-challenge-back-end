import { type AddAlunoRepository } from '@/data/protocols'
import { type AlunoModel } from '@/domain/models/aluno'
import { type AddAlunoParams } from '@/domain/usecases/add-aluno'

export class AddAlunoRepositorySpy implements AddAlunoRepository {
  addAlunoParams: AddAlunoParams
  alunoModel: AlunoModel

  async add (data: AddAlunoParams): Promise<AlunoModel> {
    this.addAlunoParams = data
    return this.alunoModel
  }
}
