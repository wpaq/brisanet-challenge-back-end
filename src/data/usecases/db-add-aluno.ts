import { type AlunoModel } from '@/domain/models/aluno'
import { type AddAlunoParams, type AddAluno } from '@/domain/usecases/add-aluno'
import { type AddAlunoRepository } from '../protocols/aluno/add-aluno-repository'

export class DbAddAluno implements AddAluno {
  constructor (
    private readonly addAlunoRepository: AddAlunoRepository
  ) {}

  async add (data: AddAlunoParams): Promise<AlunoModel> {
    const newAluno = await this.addAlunoRepository.add(data)
    return newAluno
  }
}
