export const alunoParamsSchema = {
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
    },
    matricula: {
      type: 'string'
    }
  },
  required: ['nome', 'telefone', 'email', 'cpf', 'matricula']
}
