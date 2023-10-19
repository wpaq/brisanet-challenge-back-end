import { type CheckAlunoByIdRepository, type AddCadeirasAlunosRepository, type CheckCadeiraByIdRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type AddCadeirasAlunos, type AddCadeirasAlunosParams } from '@/domain/usecases'

export class DbAddCadeirasAlunos implements AddCadeirasAlunos {
  constructor (
    private readonly addCadeirasAlunosRepository: AddCadeirasAlunosRepository,
    private readonly checkAlunoByIdRepository: CheckAlunoByIdRepository,
    private readonly checkCadeiraByIdRepository: CheckCadeiraByIdRepository
  ) {}

  async add (data: AddCadeirasAlunosParams): Promise<CadeirasAlunosModel | boolean> {
    const alunoExists = await this.checkAlunoByIdRepository.checkById(data.alunoId)
    const cadeiraExists = await this.checkCadeiraByIdRepository.checkById(data.cadeiraId)
    if (alunoExists && cadeiraExists) {
      return await this.addCadeirasAlunosRepository.add(data)
    }
    return false
  }
}
