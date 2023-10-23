import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeCadeiraController } from '../factories/controllers/cadeira-controller-factory'
import { makeLoadCadeirasController } from '@/main/factories/controllers/load-cadeiras-controller-factory'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/cadeira', adaptRoute(makeCadeiraController()))
  router.get('/cadeira', adaptRoute(makeLoadCadeirasController()))
}
