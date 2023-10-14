import { type AddProfessorRepository } from '@/data/protocols'
import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessorParams } from '@/domain/usecases/add-professor'
import { PrismaHelper } from '@/infra/db/prisma'

export class ProfessorPrismaRepository implements AddProfessorRepository {
  async add (data: AddProfessorParams): Promise<ProfessorModel> {
    const newProfessor = await PrismaHelper.client.professor.create({
      data: {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        cpf: data.cpf
      }
    })
    return newProfessor
  }
}
