import { makeDbCheckAlunoById } from '../aluno/check-aluno-by-id-factory'
import { makeDbCheckCadeiraById } from '../cadeira/check-cadeira-by-id-factory'
import { makeDbCountCadeirasAlunosById } from './count-cadeiras-alunos-by-id-factory'
import { DbAddCadeirasAlunos } from '@/data/usecases'
import { type AddCadeirasAlunos } from '@/domain/usecases'
import { CadeirasAlunosPrismaRepository } from '@/infra/db/prisma'

export const makeDbAddCadeirasAlunos = (): AddCadeirasAlunos => {
  const cadeirasAlunosPrismaRepository = new CadeirasAlunosPrismaRepository()
  return new DbAddCadeirasAlunos(cadeirasAlunosPrismaRepository, makeDbCheckAlunoById(), makeDbCheckCadeiraById(), makeDbCountCadeirasAlunosById())
}
