import { mockCadeiraModel } from '@/tests/domain/mock-cadeira'
import { type CadeiraModel } from '@/domain/models/cadeira'
import { type AddCadeira, type AddCadeiraParams } from '@/domain/usecases/add-cadeira'

export class AddCadeiraSpy implements AddCadeira {
  addCadeiraParams: AddCadeiraParams
  result = mockCadeiraModel()

  async add (data: AddCadeiraParams): Promise<CadeiraModel> {
    this.addCadeiraParams = data
    return this.result
  }
}
