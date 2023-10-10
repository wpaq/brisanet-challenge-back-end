import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/professor', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
