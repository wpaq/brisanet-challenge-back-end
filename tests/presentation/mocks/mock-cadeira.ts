import { mockCadeiraModel } from '@/tests/domain'

import { type CadeiraModel } from '@/domain/models'
import { type AddCadeira, type AddCadeiraParams } from '@/domain/usecases'

export class AddCadeiraSpy implements AddCadeira {
  addCadeiraParams: AddCadeiraParams
  result = mockCadeiraModel()

  async add (data: AddCadeiraParams): Promise<CadeiraModel> {
    this.addCadeiraParams = data
    return this.result
  }
}
