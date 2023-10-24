import { type CheckCadeiraByIdRepository } from '@/data/protocols'
import { type CheckCadeiraById } from '@/domain/usecases'

export class DbCheckCadeiraById implements CheckCadeiraById {
  constructor (private readonly checkCadeiraByIdRepository: CheckCadeiraByIdRepository) {}

  async checkById (id: string): Promise<boolean> {
    return await this.checkCadeiraByIdRepository.checkById(id)
  }
}
