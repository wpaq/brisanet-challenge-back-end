import {
  addProfessorParamsSchema,
  errorSchema,
  addAlunoParamsSchema,
  addCadeiraParamsSchema,
  cadeirasSchema
} from './schemas/'

export default {
  addProfessorParams: addProfessorParamsSchema,
  error: errorSchema,
  addAlunoParams: addAlunoParamsSchema,
  addCadeiraParams: addCadeiraParamsSchema,
  cadeiras: cadeirasSchema
}
