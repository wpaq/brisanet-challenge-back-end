import { type AddProfessorParams } from '@/domain/usecases/add-professor'
import { type Context } from './context'

export async function createProfessor (professor: AddProfessorParams, ctx: Context): Promise<AddProfessorParams> {
  const newProfessor = await ctx.prisma.professor.create({
    data: professor
  })
  return newProfessor
}
