import { mockCadeiraModel } from '@/tests/domain/mock-cadeira'

import { type CheckCadeiraByIdRepository, type AddCadeiraRepository } from '@/data/protocols'
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
