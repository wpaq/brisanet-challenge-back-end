import {
  addProfessorParamsSchema,
  errorSchema,
  addAlunoParamsSchema,
  addCadeiraParamsSchema,
  cadeirasSchema,
  addCadeirasAlunosParamsSchema,
  cadeirasAlunosSchema
} from './schemas/'

export default {
  addProfessorParams: addProfessorParamsSchema,
  error: errorSchema,
  addAlunoParams: addAlunoParamsSchema,
  addCadeiraParams: addCadeiraParamsSchema,
  cadeiras: cadeirasSchema,
  addCadeirasAlunosParams: addCadeirasAlunosParamsSchema,
  cadeirasAlunos: cadeirasAlunosSchema
}
