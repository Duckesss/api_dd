import { Router } from 'express'
import Utils from '../Utils'
const routes = Router()

routes.get('/dice', (req, res) => {
  const { faces = 6, rolls = 6, critical = 6 } = req.params
  const result = Utils.roll(Number(faces), Number(rolls), Number(critical))
  return res.status(200).json(result)
})

export default routes
