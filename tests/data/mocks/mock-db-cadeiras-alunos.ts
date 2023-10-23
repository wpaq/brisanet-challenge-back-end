import { mockCadeirasAlunosModel } from '@/tests/domain'

import { type CountCadeirasAlunosByIdRepository, type AddCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type AddCadeirasAlunosParams } from '@/domain/usecases'

export class AddCadeirasAlunosRepositorySpy implements AddCadeirasAlunosRepository {
  addCadeirasAlunosParams: AddCadeirasAlunosParams
  result = mockCadeirasAlunosModel()

  async add (data: AddCadeirasAlunosParams): Promise<CadeirasAlunosModel> {
    this.addCadeirasAlunosParams = data
    return this.result
  }
}

export class CountCadeirasAlunosByIdRepositorySpy implements CountCadeirasAlunosByIdRepository {
  alunoId: string
  cadeiraId: string
  result = 0

  async countById (alunoId: string, cadeiraId: string): Promise<number> {
    this.alunoId = alunoId
    this.cadeiraId = cadeiraId
    return this.result
  }

  async countByAlunoId (id: string): Promise<number> {
    this.alunoId = id
    return this.result
  }
}
