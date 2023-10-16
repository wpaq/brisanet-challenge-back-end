import { type AddCadeiraRepository } from '@/data/protocols'
import { type CadeiraModel } from '@/domain/models/cadeira'
import { type AddCadeira, type AddCadeiraParams } from '@/domain/usecases/add-cadeira'

export class DbAddCadeira implements AddCadeira {
  constructor (
    private readonly addCadeiraRepository: AddCadeiraRepository
  ) {}

  async add (data: AddCadeiraParams): Promise<CadeiraModel> {
    const newCadeira = await this.addCadeiraRepository.add(data)
    return newCadeira
  }
}
