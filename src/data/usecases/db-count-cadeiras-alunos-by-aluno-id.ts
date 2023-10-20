import { type CountCadeirasAlunosByIdRepository } from '@/data/protocols'
import { type CountCadeirasAlunosById } from '@/domain/usecases'

export class DbCountCadeirasAlunosById implements CountCadeirasAlunosById {
  constructor (private readonly countCadeirasAlunosByIdRepository: CountCadeirasAlunosByIdRepository) {}

  async countById (id: string): Promise<number> {
    return await this.countCadeirasAlunosByIdRepository.countById(id)
  }
}
