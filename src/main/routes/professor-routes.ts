import { adaptRoute } from '@/main/adapters'
import { makeAddProfessorController } from '@/main/factories/controllers'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/professor', adaptRoute(makeAddProfessorController()))
}
