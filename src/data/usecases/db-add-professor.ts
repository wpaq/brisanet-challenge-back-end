import { type CheckProfessorByEmailRepository, type AddProfessorRepository } from '@/data/protocols'
import { type ProfessorModel } from '@/domain/models'
import { type AddProfessor, type AddProfessorParams } from '@/domain/usecases'

export class DbAddProfessor implements AddProfessor {
  constructor (
    private readonly addProfessorRepository: AddProfessorRepository,
    private readonly checkProfessorByEmailRepository: CheckProfessorByEmailRepository
  ) {}

  async add (data: AddProfessorParams): Promise<ProfessorModel | boolean> {
    const exists = await this.checkProfessorByEmailRepository.checkByEmail(data.email)
    if (!exists) {
      return await this.addProfessorRepository.add(data)
    }
    return false
  }
}
