import { type CheckAlunoByIdRepository, type AddCadeirasAlunosRepository, type CheckCadeiraByIdRepository, type CountCadeirasAlunosByIdRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type AddCadeirasAlunos, type AddCadeirasAlunosParams } from '@/domain/usecases'

export class DbAddCadeirasAlunos implements AddCadeirasAlunos {
  constructor (
    private readonly addCadeirasAlunosRepository: AddCadeirasAlunosRepository,
    private readonly checkAlunoByIdRepository: CheckAlunoByIdRepository,
    private readonly checkCadeiraByIdRepository: CheckCadeiraByIdRepository,
    private readonly countCadeirasAlunosByIdRepository: CountCadeirasAlunosByIdRepository
  ) {}

  async add (data: AddCadeirasAlunosParams): Promise<CadeirasAlunosModel | boolean> {
    const alunoExists = await this.checkAlunoByIdRepository.checkById(data.alunoId)
    const cadeiraExists = await this.checkCadeiraByIdRepository.checkById(data.cadeiraId)

    const countCadeirasAlunos = await this.countCadeirasAlunosByIdRepository.countById(data.alunoId, data.cadeiraId)
    const countAluno = await this.countCadeirasAlunosByIdRepository.countByAlunoId(data.alunoId)

    if (countCadeirasAlunos === 0 && countAluno !== 8 && alunoExists && cadeiraExists) {
      return await this.addCadeirasAlunosRepository.add(data)
    }
    return false
  }
}
