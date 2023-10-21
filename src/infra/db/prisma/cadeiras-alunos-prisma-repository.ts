import { PrismaHelper } from './helpers/prisma-helper'
import { type AddCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type CountCadeirasAlunosById, type AddCadeirasAlunosParams } from '@/domain/usecases'

export class CadeirasAlunosPrismaRepository implements AddCadeirasAlunosRepository, CountCadeirasAlunosById {
  async add (data: AddCadeirasAlunosParams): Promise<CadeirasAlunosModel> {
    const newCadeirasAlunos = await PrismaHelper.client.cadeirasAlunos.create({
      data: {
        aluno: {
          connect: { id: data.alunoId }
        },
        cadeira: {
          connect: { id: data.cadeiraId }
        }
      }
    })
    return newCadeirasAlunos
  }

  async countById (id: string): Promise<number> {
    const count = await PrismaHelper.client.cadeirasAlunos.count()
    return count
  }
}
