export const cadeirasAlunosPath = {
  post: {
    tags: ['CadeirasAlunos'],
    summary: 'API para criar uma cadeirasAlunos',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addCadeirasAlunosParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/cadeirasAlunos'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  put: {
    tags: ['CadeirasAlunos'],
    summary: 'API para atualizar uma cadeirasAlunos',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    parameters: [{
      in: 'path',
      name: 'statusMatricula',
      description: 'O status da matricula',
      required: true,
      schema: {
        type: 'string',
        enum: ['aprovado', 'rejeitado']
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateCadeirasAlunosParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/cadeirasAlunos'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
