export const cadeirasAlunosSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    alunoId: {
      type: 'string',
      format: 'uuid'
    },
    cadeiraId: {
      type: 'string',
      format: 'uuid'
    },
    professorId: {
      type: 'string',
      format: 'uuid'
    },
    statusMatricula: {
      type: 'string'
    }
  },
  required: ['id', 'alunoId', 'cadeiraId', 'professorId', 'statusMatricula']
}
