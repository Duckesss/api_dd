import { Router } from 'express'
import Utils from '../Utils'
import LoginController from '../controllers/LoginController'
const routes = Router()

routes.get('/dice', (req, res) => {
  const { faces = 6, rolls = 6, critical = 6 } = req.params
  const result = Utils.roll(Number(faces), Number(rolls), Number(critical))
  return res.status(200).json(result)
})

routes.get('/ping', (req, res) => {
  return res.status(200).json({ pong: 1 })
})

routes.get('/user/get', LoginController.get)

routes.post('/user/login', LoginController.login)
routes.post('/user/create', LoginController.create)

export default routes
