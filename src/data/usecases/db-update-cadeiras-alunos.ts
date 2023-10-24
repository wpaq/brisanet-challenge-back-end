import { type UpdateCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type UpdateCadeirasAlunos, type UpdateCadeirasAlunosParams } from '@/domain/usecases'

export class DbUpdateCadeirasAlunos implements UpdateCadeirasAlunos {
  constructor (
    private readonly updateCadeirasAlunoRepository: UpdateCadeirasAlunosRepository
  ) {}

  async update (data: UpdateCadeirasAlunosParams): Promise<CadeirasAlunosModel | boolean> {
    return await this.updateCadeirasAlunoRepository.update(data)
  }
}
