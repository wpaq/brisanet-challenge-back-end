import { type AddCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type AddCadeirasAlunos, type AddCadeirasAlunosParams } from '@/domain/usecases'

export class DbAddCadeirasAlunos implements AddCadeirasAlunos {
  constructor (private readonly addCadeirasAlunosRepository: AddCadeirasAlunosRepository) {}

  async add (data: AddCadeirasAlunosParams): Promise<CadeirasAlunosModel | boolean> {
    return await this.addCadeirasAlunosRepository.add(data)
  }
}