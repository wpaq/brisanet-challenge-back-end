import { type AddCadeiraRepository } from '@/data/protocols'
import { type CadeiraModel } from '@/domain/models'
import { type AddCadeira, type AddCadeiraParams, type CheckProfessorById } from '@/domain/usecases'

export class DbAddCadeira implements AddCadeira {
  constructor (
    private readonly addCadeiraRepository: AddCadeiraRepository,
    private readonly checkProfessorByIdRepository: CheckProfessorById
  ) {}

  async add (data: AddCadeiraParams): Promise<CadeiraModel | boolean> {
    const professorExists = await this.checkProfessorByIdRepository.checkById(data.professorId)
    if (professorExists) {
      return await this.addCadeiraRepository.add(data)
    }
    return false
  }
}
