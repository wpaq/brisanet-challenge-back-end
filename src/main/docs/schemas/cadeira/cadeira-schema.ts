export const cadeiraSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
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
  required: ['id', 'nome', 'slug', 'dataInicio', 'dataFim', 'cargaHoraria', 'professorId']
}
