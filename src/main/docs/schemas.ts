import {
  addProfessorParamsSchema,
  errorSchema,
  addAlunoParamsSchema,
  addCadeiraParamsSchema,
  cadeirasSchema,
  addCadeirasAlunosParamsSchema,
  cadeirasAlunosSchema,
  updateCadeirasAlunosParamsSchema
} from './schemas/'

export default {
  addProfessorParams: addProfessorParamsSchema,
  error: errorSchema,
  addAlunoParams: addAlunoParamsSchema,
  addCadeiraParams: addCadeiraParamsSchema,
  cadeiras: cadeirasSchema,
  addCadeirasAlunosParams: addCadeirasAlunosParamsSchema,
  cadeirasAlunos: cadeirasAlunosSchema,
  updateCadeirasAlunosParams: updateCadeirasAlunosParamsSchema
}
