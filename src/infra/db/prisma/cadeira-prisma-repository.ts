import { PrismaHelper } from './prisma-helper'
import { type AddCadeiraRepository } from '@/data/protocols'
import { type CadeiraModel } from '@/domain/models/cadeira'
import { type AddCadeiraParams } from '@/domain/usecases/add-cadeira'

export class CadeiraPrismaRepository implements AddCadeiraRepository {
  async add (data: AddCadeiraParams): Promise<CadeiraModel> {
    const newCadeira = await PrismaHelper.client.cadeira.create({
      data: {
        nome: data.nome,
        slug: data.slug,
        dataInicio: data.dataInicio,
        dataFim: data.dataFim,
        cargaHoraria: data.cargaHoraria,
        professor: {
          connect: { id: data.professorId }
        }
      }
    })
    return newCadeira
  }
}