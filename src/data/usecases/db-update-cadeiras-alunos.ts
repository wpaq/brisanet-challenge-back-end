import { type CheckCadeirasAlunosByIdRepository, type UpdateCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type UpdateCadeirasAlunos, type UpdateCadeirasAlunosParams } from '@/domain/usecases'

export class DbUpdateCadeirasAlunos implements UpdateCadeirasAlunos {
  constructor (
    private readonly updateCadeirasAlunoRepository: UpdateCadeirasAlunosRepository,
    private readonly checkCadeirasAlunosByIdRepository: CheckCadeirasAlunosByIdRepository
  ) {}

  async update (data: UpdateCadeirasAlunosParams): Promise<CadeirasAlunosModel | boolean> {
    const exists = await this.checkCadeirasAlunosByIdRepository.checkById(data.id)
    if (exists) {
      return await this.updateCadeirasAlunoRepository.update(data)
    }
    return false
  }
}
