export const addCadeiraParamsSchema = {
  type: 'object',
  properties: {
    nome: {
      type: 'string'
    },
    slug: {
      type: 'string'
    },
    dataInicio: {
      type: 'string',
      format: 'date'
    },
    dataFim: {
      type: 'string',
      format: 'date'
    },
    cargaHoraria: {
      type: 'integer'
    },
    professorId: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: ['nome', 'slug', 'dataInicio', 'dataFim', 'cargaHoraria', 'professorId']
}
