import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeCadeirasAlunosController } from '../factories/controllers/cadeiras-alunos-controller-factory'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/cadeiras-alunos', adaptRoute(makeCadeirasAlunosController()))
}
