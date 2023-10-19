import { PrismaHelper } from './helpers/prisma-helper'
import { type AddCadeirasAlunosRepository } from '@/data/protocols'
import { type CadeirasAlunosModel } from '@/domain/models'
import { type AddCadeirasAlunosParams } from '@/domain/usecases'

export class CadeirasAlunosPrismaRepository implements AddCadeirasAlunosRepository {
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
}
