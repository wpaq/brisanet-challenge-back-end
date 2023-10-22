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

  async countByAlunoId (id: string): Promise<number> {
    this.alunoId = id
    return this.result
  }

  async countByCadeiraId (id: string): Promise<number> {
    this.cadeiraId = id
    return this.result
  }
}
