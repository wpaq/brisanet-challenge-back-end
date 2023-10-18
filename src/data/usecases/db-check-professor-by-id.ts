import { type CheckProfessorByIdRepository } from '@/data/protocols'
import { type CheckProfessorById } from '@/domain/usecases'

export class DbCheckProfessorById implements CheckProfessorById {
  constructor (private readonly checkProfessorByIdRepository: CheckProfessorByIdRepository) {}

  async checkById (id: string): Promise<boolean> {
    return await this.checkProfessorByIdRepository.checkById(id)
  }
}
