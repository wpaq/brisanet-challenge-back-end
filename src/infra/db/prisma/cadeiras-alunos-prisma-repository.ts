import { PrismaHelper } from './helpers/prisma-helper'
import { type AddCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type CountCadeirasAlunosById, type AddCadeirasAlunosParams } from '@/domain/usecases'

export class CadeirasAlunosPrismaRepository implements AddCadeirasAlunosRepository, CountCadeirasAlunosById {
  async add (data: AddCadeirasAlunosParams): Promise<CadeirasAlunosModel> {
    const newCadeirasAlunos = await PrismaHelper.client.cadeirasAlunos.create({
      data: {
        cadeira: { connect: { id: data.cadeiraId } },
        aluno: { connect: { id: data.alunoId } },
        professor: { connect: { id: data.professorId } },
        statusMatricula: 'Pendente'
      }
    })
    return newCadeirasAlunos
  }

  async countById (alunoId: string, cadeiraId: string): Promise<number> {
    const count = await PrismaHelper.client.cadeirasAlunos.count({
      where: {
        alunoId,
        cadeiraId
      }
    })
    return count
  }

  async countByAlunoId (alunoId: string): Promise<number> {
    const count = await PrismaHelper.client.cadeirasAlunos.count({
      where: {
        alunoId
      }
    })
    return count
  }
}
