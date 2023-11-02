import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Back-end challenge Brisalabs',
    description: 'Essa é a documentação da API Brisalabs',
    version: '1.0.0',
    contact: {
      name: 'Wallyson Pablo',
      email: 'wallysonpabloo@gmail.com',
      url: 'https://www.linkedin.com/in/wallyson-pablo'
    },
    license: {
      name: 'ISC',
      url: 'https://spdx.org/licenses/ISC.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Professor',
    description: 'APIs relacionadas ao Professor'
  }, {
    name: 'Aluno',
    description: 'APIs relacionadas ao Aluno'
  }, {
    name: 'Cadeira',
    description: 'APIs relacionadas a Cadeira'
  }],
  paths,
  schemas,
  components
}
