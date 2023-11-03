export const alunoSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
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
  required: ['id', 'nome', 'telefone', 'email', 'cpf', 'matricula']
}
