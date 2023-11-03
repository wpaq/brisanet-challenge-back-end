import {
  errorSchema,
  professorSchema,
  addProfessorParamsSchema,
  alunoSchema,
  addAlunoParamsSchema,
  cadeiraSchema,
  cadeirasSchema,
  addCadeiraParamsSchema,
  cadeirasAlunosSchema,
  addCadeirasAlunosParamsSchema,
  updateCadeirasAlunosParamsSchema
} from './schemas/'

export default {
  error: errorSchema,
  professor: professorSchema,
  addProfessorParams: addProfessorParamsSchema,
  aluno: alunoSchema,
  addAlunoParams: addAlunoParamsSchema,
  cadeira: cadeiraSchema,
  cadeiras: cadeirasSchema,
  addCadeiraParams: addCadeiraParamsSchema,
  cadeirasAlunos: cadeirasAlunosSchema,
  addCadeirasAlunosParams: addCadeirasAlunosParamsSchema,
  updateCadeirasAlunosParams: updateCadeirasAlunosParamsSchema
}
