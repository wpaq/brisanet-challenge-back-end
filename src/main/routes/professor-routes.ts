import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeProfessorController } from '../factories/controllers/professor-controller-factory'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/professor', adaptRoute(makeProfessorController()))
}
