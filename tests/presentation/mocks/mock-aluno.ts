import { mockAlunoModel } from '@/tests/domain/mock-aluno'
import { type AlunoModel } from '@/domain/models/aluno'
import { type AddAluno, type AddAlunoParams } from '@/domain/usecases/add-aluno'

export class AddAlunoSpy implements AddAluno {
  addAlunoParams: AddAlunoParams
  result = mockAlunoModel()

  async add (data: AddAlunoParams): Promise<AlunoModel> {
    this.addAlunoParams = data
    return this.result
  }
}
