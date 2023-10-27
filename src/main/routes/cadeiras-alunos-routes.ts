import { adaptRoute } from '@/main/adapters'
import { makeAddCadeirasAlunosController, makeUpdateCadeirasAlunosController } from '@/main/factories/controllers'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/cadeiras-alunos', adaptRoute(makeAddCadeirasAlunosController()))
  router.put('/cadeiras-alunos', adaptRoute(makeUpdateCadeirasAlunosController()))
}
