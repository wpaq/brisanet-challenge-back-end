import { type AddAlunoRepository } from '@/data/protocols'
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
