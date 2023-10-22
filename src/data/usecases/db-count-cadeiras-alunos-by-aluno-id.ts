import { type CountCadeirasAlunosByIdRepository } from '@/data/protocols'
import { type CountCadeirasAlunosById } from '@/domain/usecases'

export class DbCountCadeirasAlunosById implements CountCadeirasAlunosById {
  constructor (private readonly countCadeirasAlunosByIdRepository: CountCadeirasAlunosByIdRepository) {}

  async countByAlunoId (id: string): Promise<number> {
    return await this.countCadeirasAlunosByIdRepository.countByAlunoId(id)
  }

  async countByCadeiraId (id: string): Promise<number> {
    return await this.countCadeirasAlunosByIdRepository.countByCadeiraId(id)
  }
}
