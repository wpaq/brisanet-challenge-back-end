import {
  addProfessorParamsSchema,
  errorSchema,
  addAlunoParamsSchema,
  addCadeiraParamsSchema,
  cadeirasSchema,
  addCadeirasAlunosParamsSchema,
  cadeirasAlunosSchema,
  updateCadeirasAlunosParamsSchema,
  professorSchema,
  alunoSchema,
  cadeiraSchema
} from './schemas/'

export default {
  addProfessorParams: addProfessorParamsSchema,
  error: errorSchema,
  addAlunoParams: addAlunoParamsSchema,
  addCadeiraParams: addCadeiraParamsSchema,
  cadeiras: cadeirasSchema,
  addCadeirasAlunosParams: addCadeirasAlunosParamsSchema,
  cadeirasAlunos: cadeirasAlunosSchema,
  updateCadeirasAlunosParams: updateCadeirasAlunosParamsSchema,
  professor: professorSchema,
  aluno: alunoSchema,
  cadeira: cadeiraSchema
}
