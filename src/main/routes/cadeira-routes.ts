import { adaptRoute } from '@/main/adapters'
import { makeAddCadeiraController, makeLoadCadeirasController } from '@/main/factories/controllers'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/cadeira', adaptRoute(makeAddCadeiraController()))
  router.get('/cadeira', adaptRoute(makeLoadCadeirasController()))
}
