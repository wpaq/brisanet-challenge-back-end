import { type CheckCadeirasAlunosByIdRepository } from '@/data/protocols'
import { type CheckCadeirasAlunosById } from '@/domain/usecases'

export class DbCheckCadeirasAlunosById implements CheckCadeirasAlunosById {
  constructor (private readonly checkCadeirasAlunosByIdRepository: CheckCadeirasAlunosByIdRepository) {}

  async checkById (id: string): Promise<boolean> {
    return await this.checkCadeirasAlunosByIdRepository.checkById(id)
  }
}
