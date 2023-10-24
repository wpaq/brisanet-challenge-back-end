import { type LoadCadeiraByIdRepository } from '@/data/protocols'
import { type CadeiraModel } from '@/domain/models'
import { type LoadCadeiraById } from '@/domain/usecases'

export class DbLoadCadeiraById implements LoadCadeiraById {
  constructor (
    private readonly loadCadeiraByIdRepository: LoadCadeiraByIdRepository
  ) {}

  async loadById (id: string): Promise<CadeiraModel> {
    return await this.loadCadeiraByIdRepository.loadById(id)
  }
}
