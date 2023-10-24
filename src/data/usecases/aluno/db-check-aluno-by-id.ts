import { type CheckAlunoByIdRepository } from '@/data/protocols'
import { type CheckAlunoById } from '@/domain/usecases'

export class DbCheckAlunoById implements CheckAlunoById {
  constructor (private readonly checkAlunoByIdRepository: CheckAlunoByIdRepository) {}

  async checkById (id: string): Promise<boolean> {
    return await this.checkAlunoByIdRepository.checkById(id)
  }
}
