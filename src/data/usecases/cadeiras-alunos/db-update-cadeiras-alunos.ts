import { type LoadProfessorByIdRepository, type CheckCadeirasAlunosByIdRepository, type UpdateCadeirasAlunosRepository, type LoadAlunoByIdRepository, type EmailNotification, type LoadCadeiraByIdRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type UpdateCadeirasAlunos, type UpdateCadeirasAlunosParams } from '@/domain/usecases'

export class DbUpdateCadeirasAlunos implements UpdateCadeirasAlunos {
  constructor (
    private readonly updateCadeirasAlunoRepository: UpdateCadeirasAlunosRepository,
    private readonly checkCadeirasAlunosByIdRepository: CheckCadeirasAlunosByIdRepository,
    private readonly loadProfessorByIdRepository: LoadProfessorByIdRepository,
    private readonly loadAlunoByIdRepository: LoadAlunoByIdRepository,
    private readonly emailNotification: EmailNotification,
    private readonly loadCadeiraByIdRepository: LoadCadeiraByIdRepository
  ) {}

  async update (data: UpdateCadeirasAlunosParams): Promise<CadeirasAlunosModel | boolean> {
    data.statusMatricula = data.statusMatricula.toUpperCase()

    const exists = await this.checkCadeirasAlunosByIdRepository.checkById(data.id)
    if (exists) {
      const cadeirasAlunosUpdated = await this.updateCadeirasAlunoRepository.update(data)
      const professor = await this.loadProfessorByIdRepository.loadById(cadeirasAlunosUpdated.professorId)
      const aluno = await this.loadAlunoByIdRepository.loadById(cadeirasAlunosUpdated.alunoId)
      const cadeira = await this.loadCadeiraByIdRepository.loadById(cadeirasAlunosUpdated.cadeiraId)

      const sendEmail = await this.emailNotification.send(
        aluno.email,
        professor.email,
        professor.nome,
        cadeira.nome,
        data.statusMatricula
      )
      if (!sendEmail) {
        return false
      }

      return cadeirasAlunosUpdated
    }
    return false
  }
}
