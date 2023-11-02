import {
  addProfessorParamsSchema,
  errorSchema,
  addAlunoParamsSchema,
  addCadeiraParamsSchema
} from './schemas/'

export default {
  addProfessorParams: addProfessorParamsSchema,
  error: errorSchema,
  addAlunoParams: addAlunoParamsSchema,
  addCadeiraParams: addCadeiraParamsSchema
}
