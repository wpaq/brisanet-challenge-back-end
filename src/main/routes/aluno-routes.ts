import { adaptRoute } from '@/main/adapters'
import { makeAlunoController } from '@/main/factories/controllers'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/aluno', adaptRoute(makeAlunoController()))
}
