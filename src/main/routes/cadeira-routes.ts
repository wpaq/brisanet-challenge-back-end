import { adaptRoute } from '@/main/adapters'
import { makeCadeiraController, makeLoadCadeirasController } from '@/main/factories/controllers'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/cadeira', adaptRoute(makeCadeiraController()))
  router.get('/cadeiras', adaptRoute(makeLoadCadeirasController()))
}
