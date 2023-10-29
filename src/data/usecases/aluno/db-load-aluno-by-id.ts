import { type LoadAlunoByIdRepository } from '@/data/protocols'
import { type AlunoModel } from '@/domain/models'
import { type LoadAlunoById } from '@/domain/usecases'

export class DbLoadAlunoById implements LoadAlunoById {
  constructor (
    private readonly loadAlunoByIdRepository: LoadAlunoByIdRepository
  ) {}

  async loadById (id: string): Promise<AlunoModel> {
    return await this.loadAlunoByIdRepository.loadById(id)
  }
}
