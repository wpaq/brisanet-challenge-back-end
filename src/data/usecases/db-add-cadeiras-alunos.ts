import { type CheckAlunoByIdRepository, type AddCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type AddCadeirasAlunos, type AddCadeirasAlunosParams } from '@/domain/usecases'

export class DbAddCadeirasAlunos implements AddCadeirasAlunos {
  constructor (
    private readonly addCadeirasAlunosRepository: AddCadeirasAlunosRepository,
    private readonly checkAlunoByIdRepository: CheckAlunoByIdRepository
  ) {}

  async add (data: AddCadeirasAlunosParams): Promise<CadeirasAlunosModel | boolean> {
    const alunoExists = await this.checkAlunoByIdRepository.checkById(data.alunoId)
    if (alunoExists) {
      return await this.addCadeirasAlunosRepository.add(data)
    }
    return false
  }
}
