export const cadeirasSchema = {
  type: 'array',
  items: {
    allOf: [
      { $ref: '#/schemas/addCadeiraParams' },
      {
        type: 'object',
        properties: {
          cadeirasAlunos: {
            type: 'array',
            items: {
              $ref: '#/schemas/cadeirasAlunos'
            }
          }
        }
      }
    ]
  }
}
