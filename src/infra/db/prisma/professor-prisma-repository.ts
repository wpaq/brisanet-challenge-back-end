import { PrismaHelper } from '@/infra/db/prisma'
import { type CheckProfessorByEmailRepository, type AddProfessorRepository, type CheckProfessorByIdRepository } from '@/data/protocols'
import { type ProfessorModel } from '@/domain/models'
import { type AddProfessorParams } from '@/domain/usecases'

export class ProfessorPrismaRepository implements AddProfessorRepository, CheckProfessorByEmailRepository, CheckProfessorByIdRepository {
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

  async checkByEmail (email: string): Promise<boolean> {
    const professor = await PrismaHelper.client.professor.findUnique({
      where: {
        email
      }
    })
    return professor !== null
  }

  async checkById (id: string): Promise<boolean> {
    const professor = await PrismaHelper.client.professor.findUnique({
      where: {
        id
      }
    })
    return professor !== null
  }
}
