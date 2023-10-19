import { PrismaHelper } from './helpers/prisma-helper'
import { type CheckCadeiraByIdRepository, type AddCadeiraRepository } from '@/data/protocols'
import { type CadeiraModel } from '@/domain/models'
import { type AddCadeiraParams } from '@/domain/usecases'

export class CadeiraPrismaRepository implements AddCadeiraRepository, CheckCadeiraByIdRepository {
  async add (data: AddCadeiraParams): Promise<CadeiraModel> {
    const newCadeira = await PrismaHelper.client.cadeira.create({
      data: {
        nome: data.nome,
        slug: data.slug,
        dataInicio: new Date(data.dataInicio),
        dataFim: new Date(data.dataFim),
        cargaHoraria: data.cargaHoraria,
        professor: {
          connect: { id: data.professorId }
        }
      }
    })
    return newCadeira
  }

  async checkById (id: string): Promise<boolean> {
    const aluno = await PrismaHelper.client.cadeira.findUnique({
      where: {
        id
      }
    })
    return aluno !== null
  }
}
