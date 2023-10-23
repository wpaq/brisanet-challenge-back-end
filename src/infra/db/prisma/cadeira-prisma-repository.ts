import { PrismaHelper } from './helpers/prisma-helper'
import { type CheckCadeiraByIdRepository, type AddCadeiraRepository, type CheckCadeiraByPeriodRepository, type LoadCadeirasRepository } from '@/data/protocols'
import { type CadeiraModel } from '@/domain/models'
import { type AddCadeiraParams } from '@/domain/usecases'

export class CadeiraPrismaRepository implements AddCadeiraRepository, CheckCadeiraByIdRepository, CheckCadeiraByPeriodRepository, LoadCadeirasRepository {
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
    const cadeira = await PrismaHelper.client.cadeira.findUnique({
      where: {
        id
      }
    })
    return cadeira !== null
  }

  async checkByPeriod (dataInicio: Date, dataFim: Date): Promise<boolean> {
    const cadeira = await PrismaHelper.client.cadeira.findFirst({
      where: {
        dataInicio: {
          lte: new Date(dataFim)
        },
        dataFim: {
          gte: new Date(dataInicio)
        }
      }
    })
    return cadeira !== null
  }

  async loadAll (): Promise<CadeiraModel[]> {
    const cadeiras = await PrismaHelper.client.cadeira.findMany({
      include: { cadeirasAlunos: true }
    })
    return cadeiras
  }
}
