import { type AddProfessorRepository } from '@/data/protocols'
import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessor, type AddProfessorParams } from '@/domain/usecases/add-professor'

export class DbAddProfessor implements AddProfessor {
  constructor (
    private readonly addProfessorRepository: AddProfessorRepository
  ) {}

  async add (data: AddProfessorParams): Promise<ProfessorModel> {
    const newProfessor = await this.addProfessorRepository.add(data)
    return newProfessor
  }
}
