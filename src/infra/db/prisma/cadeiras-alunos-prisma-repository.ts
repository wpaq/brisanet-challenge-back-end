import { PrismaHelper } from './helpers/prisma-helper'
import { type UpdateCadeirasAlunosRepository, type AddCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type CountCadeirasAlunosById, type AddCadeirasAlunosParams, type UpdateCadeirasAlunosParams, type CheckCadeirasAlunosById } from '@/domain/usecases'

export class CadeirasAlunosPrismaRepository implements AddCadeirasAlunosRepository, CountCadeirasAlunosById, UpdateCadeirasAlunosRepository, CheckCadeirasAlunosById {
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

  async update (data: UpdateCadeirasAlunosParams): Promise<CadeirasAlunosModel> {
    const cadeirasAlunosUpdate = await PrismaHelper.client.cadeirasAlunos.update({
      where: {
        id: data.id
      },
      data: {
        statusMatricula: data.statusMatricula
      }
    })
    return cadeirasAlunosUpdate
  }

  async checkById (id: string): Promise<boolean> {
    const cadeiraAluno = await PrismaHelper.client.cadeirasAlunos.findUnique({
      where: {
        id
      }
    })
    return cadeiraAluno !== null
  }
}
