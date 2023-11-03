export const updateCadeirasAlunosParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    statusMatricula: {
      type: 'string'
    }
  },
  required: ['id', 'statusMatricula']
}
