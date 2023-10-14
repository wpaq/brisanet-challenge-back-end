import { PrismaHelper } from './prisma-helper'
import { type AddAlunoRepository } from '@/data/protocols'
import { type AlunoModel } from '@/domain/models/aluno'
import { type AddAlunoParams } from '@/domain/usecases/add-aluno'

export class AlunoPrismaRepository implements AddAlunoRepository {
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
}
