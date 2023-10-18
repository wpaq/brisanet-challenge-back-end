import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAlunoController } from '@/main/factories/controllers/aluno-controller-factory'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/aluno', adaptRoute(makeAlunoController()))
}
