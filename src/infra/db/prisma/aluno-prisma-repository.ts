import { PrismaHelper } from './helpers'

import { type CheckAlunoByEmailRepository, type AddAlunoRepository, type CheckAlunoByIdRepository } from '@/data/protocols'
import { type AlunoModel } from '@/domain/models'
import { type AddAlunoParams } from '@/domain/usecases'

export class AlunoPrismaRepository implements AddAlunoRepository, CheckAlunoByEmailRepository, CheckAlunoByIdRepository {
  async add (data: AddAlunoParams): Promise<AlunoModel> {
    const newAluno = await PrismaHelper.client.aluno.create({
      data: {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        cpf: data.cpf,
        matricula: data.matricula
      }
    })
    return newAluno
  }

  async checkByEmail (email: string): Promise<boolean> {
    const aluno = await PrismaHelper.client.aluno.findUnique({
      where: {
        email
      }
    })
    return aluno !== null
  }

  async checkById (id: string): Promise<boolean> {
    const aluno = await PrismaHelper.client.aluno.findUnique({
      where: {
        id
      }
    })
    return aluno !== null
  }
}
