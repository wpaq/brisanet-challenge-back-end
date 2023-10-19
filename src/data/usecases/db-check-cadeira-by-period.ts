import { type CheckCadeiraByPeriodRepository } from '@/data/protocols'
import { type CheckCadeiraByPeriod } from '@/domain/usecases'

export class DbCheckCadeiraByPeriod implements CheckCadeiraByPeriod {
  constructor (private readonly checkCadeiraByPeriodRepository: CheckCadeiraByPeriodRepository) {}

  async checkByPeriod (dataInicio: Date, dataFim: Date): Promise<boolean> {
    return await this.checkCadeiraByPeriodRepository.checkByPeriod(dataInicio, dataFim)
  }
}
