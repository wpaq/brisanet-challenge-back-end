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
  id: string
  result = 1

  async countById (id: string): Promise<number> {
    this.id = id
    return this.result
  }
}
