import { mockCadeiraModel, mockCadeirasModels } from '@/tests/domain'

import { type CheckCadeiraByIdRepository, type AddCadeiraRepository, type CheckCadeiraByPeriodRepository, type LoadCadeirasRepository } from '@/data/protocols'
import { type CadeiraModel } from '@/domain/models'
import { type AddCadeiraParams } from '@/domain/usecases'

export class AddCadeiraRepositorySpy implements AddCadeiraRepository {
  addCadeiraParams: AddCadeiraParams
  result = mockCadeiraModel()

  async add (data: AddCadeiraParams): Promise<CadeiraModel> {
    this.addCadeiraParams = data
    return this.result
  }
}

export class CheckCadeiraByIdRepositorySpy implements CheckCadeiraByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class CheckCadeiraByPeriodRepositorySpy implements CheckCadeiraByPeriodRepository {
  dataInicio: Date
  dataFim: Date
  result = false

  async checkByPeriod (dataInicio: Date, dataFim: Date): Promise<boolean> {
    this.dataInicio = dataInicio
    this.dataFim = dataFim
    return this.result
  }
}

export class LoadCadeirasRepositorySpy implements LoadCadeirasRepository {
  result = mockCadeirasModels()

  async loadAll (): Promise<CadeiraModel[]> {
    return this.result
  }
}
