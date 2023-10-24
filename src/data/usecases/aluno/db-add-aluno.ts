import { type CheckAlunoByEmailRepository, type AddAlunoRepository } from '@/data/protocols'
import { type AlunoModel } from '@/domain/models'
import { type AddAlunoParams, type AddAluno } from '@/domain/usecases'

export class DbAddAluno implements AddAluno {
  constructor (
    private readonly addAlunoRepository: AddAlunoRepository,
    private readonly checkAlunoByEmailRepository: CheckAlunoByEmailRepository
  ) {}

  async add (data: AddAlunoParams): Promise<AlunoModel | boolean> {
    const exists = await this.checkAlunoByEmailRepository.checkByEmail(data.email)
    if (!exists) {
      return await this.addAlunoRepository.add(data)
    }
    return false
  }
}
