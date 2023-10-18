import { mockCadeiraModel } from '@/tests/domain/mock-cadeira'

import { type AddCadeiraRepository } from '@/data/protocols'
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
