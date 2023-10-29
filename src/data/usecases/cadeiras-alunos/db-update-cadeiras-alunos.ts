import { type LoadProfessorByIdRepository, type CheckCadeirasAlunosByIdRepository, type UpdateCadeirasAlunosRepository, type LoadAlunoByIdRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type UpdateCadeirasAlunos, type UpdateCadeirasAlunosParams } from '@/domain/usecases'

export class DbUpdateCadeirasAlunos implements UpdateCadeirasAlunos {
  constructor (
    private readonly updateCadeirasAlunoRepository: UpdateCadeirasAlunosRepository,
    private readonly checkCadeirasAlunosByIdRepository: CheckCadeirasAlunosByIdRepository,
    private readonly loadProfessorByIdRepository: LoadProfessorByIdRepository,
    private readonly loadAlunoByIdRepository: LoadAlunoByIdRepository
  ) {}

  async update (data: UpdateCadeirasAlunosParams): Promise<CadeirasAlunosModel | boolean> {
    data.statusMatricula = data.statusMatricula.toUpperCase()

    const exists = await this.checkCadeirasAlunosByIdRepository.checkById(data.id)
    if (exists) {
      const cadeirasAlunosUpdated = await this.updateCadeirasAlunoRepository.update(data)
      await this.loadProfessorByIdRepository.loadById(cadeirasAlunosUpdated.professorId)
      await this.loadAlunoByIdRepository.loadById(cadeirasAlunosUpdated.alunoId)

      return cadeirasAlunosUpdated
    }
    return false
  }
}
