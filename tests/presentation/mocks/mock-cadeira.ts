import { mockCadeiraModel } from '@/tests/domain'

import { type CadeiraModel } from '@/domain/models'
import { type CheckCadeiraById, type AddCadeira, type AddCadeiraParams, type CheckCadeiraByPeriod } from '@/domain/usecases'

export class AddCadeiraSpy implements AddCadeira {
  addCadeiraParams: AddCadeiraParams
  result = mockCadeiraModel()

  async add (data: AddCadeiraParams): Promise<CadeiraModel> {
    this.addCadeiraParams = data
    return this.result
  }
}

export class CheckCadeiraByIdSpy implements CheckCadeiraById {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class CheckCadeiraByPeriodSpy implements CheckCadeiraByPeriod {
  dataInicio: Date
  dataFim: Date
  result = false

  async checkByPeriod (dataInicio: Date, dataFim: Date): Promise<boolean> {
    this.dataInicio = dataInicio
    this.dataFim = dataFim
    return this.result
  }
}
