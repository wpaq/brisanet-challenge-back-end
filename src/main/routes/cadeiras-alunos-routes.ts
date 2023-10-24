import { adaptRoute } from '@/main/adapters'
import { makeCadeirasAlunosController, makeUpdateCadeirasAlunosController } from '@/main/factories/controllers'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/cadeiras-alunos', adaptRoute(makeCadeirasAlunosController()))
  router.put('/cadeiras-alunos', adaptRoute(makeUpdateCadeirasAlunosController()))
}
