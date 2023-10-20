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
  id: string
  result = 1

  async countById (id: string): Promise<number> {
    this.id = id
    return this.result
  }
}
