export const addCadeirasAlunosParamsSchema = {
  type: 'object',
  properties: {
    alunoId: {
      type: 'string',
      format: 'uuid'
    },
    cadeiraId: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: ['alunoId', 'cadeiraId']
}
