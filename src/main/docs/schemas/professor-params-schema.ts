export const professorParamsSchema = {
  type: 'object',
  properties: {
    nome: {
      type: 'string'
    },
    telefone: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    }
  },
  required: ['nome', 'telefone', 'email', 'cpf']
}
