import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeCadeiraController } from '../factories/controllers/cadeira-controller-factory'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/cadeira', adaptRoute(makeCadeiraController()))
}
