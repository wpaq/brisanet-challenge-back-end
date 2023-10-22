import { type LoadCadeirasRepository } from '@/data/protocols'
import { type CadeiraModel } from '@/domain/models'
import { type LoadCadeiras } from '@/domain/usecases'

export class DbLoadCadeiras implements LoadCadeiras {
  constructor (
    private readonly loadCadeirasRepository: LoadCadeirasRepository
  ) {}

  async load (): Promise<CadeiraModel[]> {
    return await this.loadCadeirasRepository.loadAll()
  }
}
