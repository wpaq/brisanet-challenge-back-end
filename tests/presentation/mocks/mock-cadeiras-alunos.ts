import { mockCadeirasAlunosModel } from '@/tests/domain'

import { type CadeirasAlunosModel } from '@/domain/models'
import { type CountCadeirasAlunosById, type AddCadeirasAlunos, type AddCadeirasAlunosParams } from '@/domain/usecases'

export class AddCadeirasAlunosSpy implements AddCadeirasAlunos {
  addCadeirasAlunosParams: AddCadeirasAlunosParams
  result = mockCadeirasAlunosModel()

  async add (data: AddCadeirasAlunosParams): Promise<CadeirasAlunosModel> {
    this.addCadeirasAlunosParams = data
    return this.result
  }
}

export class CountCadeirasAlunosByIdSpy implements CountCadeirasAlunosById {
  alunoId: string
  cadeiraId: string
  result = 0

  async countById (alunoId: string, cadeiraId: string): Promise<number> {
    this.alunoId = alunoId
    this.cadeiraId = cadeiraId
    return this.result
  }

  async countByAlunoId (alunoId: string): Promise<number> {
    this.alunoId = alunoId
    return this.result
  }
}
