import { type CheckCadeiraByPeriodRepository, type AddCadeiraRepository, type CheckProfessorByIdRepository } from '@/data/protocols'
import { type CadeiraModel } from '@/domain/models'
import { type AddCadeira, type AddCadeiraParams } from '@/domain/usecases'

export class DbAddCadeira implements AddCadeira {
  constructor (
    private readonly addCadeiraRepository: AddCadeiraRepository,
    private readonly checkProfessorByIdRepository: CheckProfessorByIdRepository,
    private readonly checkCadeiraByPeriodRepository: CheckCadeiraByPeriodRepository
  ) {}

  async add (data: AddCadeiraParams): Promise<CadeiraModel | boolean> {
    const professorExists = await this.checkProfessorByIdRepository.checkById(data.professorId)
    const periodExists = await this.checkCadeiraByPeriodRepository.checkByPeriod(data.dataInicio, data.dataFim)
    if (professorExists && !periodExists) {
      return await this.addCadeiraRepository.add(data)
    }
    return false
  }
}
