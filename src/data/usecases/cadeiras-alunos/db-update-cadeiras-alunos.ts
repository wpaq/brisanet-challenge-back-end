import { type LoadProfessorByIdRepository, type CheckCadeirasAlunosByIdRepository, type UpdateCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type UpdateCadeirasAlunos, type UpdateCadeirasAlunosParams } from '@/domain/usecases'

export class DbUpdateCadeirasAlunos implements UpdateCadeirasAlunos {
  constructor (
    private readonly updateCadeirasAlunoRepository: UpdateCadeirasAlunosRepository,
    private readonly checkCadeirasAlunosByIdRepository: CheckCadeirasAlunosByIdRepository,
    private readonly loadProfessorByIdRepository: LoadProfessorByIdRepository
  ) {}

  async update (data: UpdateCadeirasAlunosParams): Promise<CadeirasAlunosModel | boolean> {
    data.statusMatricula = data.statusMatricula.toUpperCase()

    const exists = await this.checkCadeirasAlunosByIdRepository.checkById(data.id)
    if (exists) {
      const cadeirasAlunosUpdated = await this.updateCadeirasAlunoRepository.update(data)
      await this.loadProfessorByIdRepository.loadById(cadeirasAlunosUpdated.professorId)

      return cadeirasAlunosUpdated
    }
    return false
  }
}
