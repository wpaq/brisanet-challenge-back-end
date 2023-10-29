import { type LoadProfessorByIdRepository } from '@/data/protocols'
import { type ProfessorModel } from '@/domain/models'
import { type LoadProfessorById } from '@/domain/usecases'

export class DbLoadProfessorById implements LoadProfessorById {
  constructor (
    private readonly loadProfessorByIdRepository: LoadProfessorByIdRepository
  ) {}

  async loadById (id: string): Promise<ProfessorModel> {
    return await this.loadProfessorByIdRepository.loadById(id)
  }
}
