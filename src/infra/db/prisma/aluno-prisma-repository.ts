import { PrismaHelper } from './prisma-helper'
import { type CheckAlunoByEmailRepository, type AddAlunoRepository } from '@/data/protocols'
import { type AlunoModel } from '@/domain/models/aluno'
import { type AddAlunoParams } from '@/domain/usecases/add-aluno'

export class AlunoPrismaRepository implements AddAlunoRepository, CheckAlunoByEmailRepository {
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
}
