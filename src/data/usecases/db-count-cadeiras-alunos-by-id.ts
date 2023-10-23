import { type CountCadeirasAlunosByIdRepository } from '@/data/protocols'
import { type CountCadeirasAlunosById } from '@/domain/usecases'

export class DbCountCadeirasAlunosById implements CountCadeirasAlunosById {
  constructor (private readonly countCadeirasAlunosByIdRepository: CountCadeirasAlunosByIdRepository) {}

  async countById (alunoId: string, cadeiraId: string): Promise<number> {
    return await this.countCadeirasAlunosByIdRepository.countById(alunoId, cadeiraId)
  }

  async countByAlunoId (alunoId: string): Promise<number> {
    return await this.countCadeirasAlunosByIdRepository.countByAlunoId(alunoId)
  }
}
