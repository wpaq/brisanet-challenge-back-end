import { type CheckProfessorByEmailRepository, type AddProfessorRepository } from '@/data/protocols'
import { type ProfessorModel } from '@/domain/models/professor'
import { type AddProfessorParams } from '@/domain/usecases/add-professor'
import { PrismaHelper } from '@/infra/db/prisma'

export class ProfessorPrismaRepository implements AddProfessorRepository, CheckProfessorByEmailRepository {
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
}
