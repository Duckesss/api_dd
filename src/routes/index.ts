import { Router } from 'express'
import Utils from '../Utils'
import LoginController from '../controllers/LoginController'
import SpellController from '../controllers/SpellController'
import BreedController from '../controllers/BreedController'
import ClassesController from '../controllers/ClassesController'
import CharacterController from '../controllers/CharacterController'
import Oauth, {onlyAdmin} from '../middlewares/Oauth'
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
routes.get('/user/getAll', LoginController.getAll)
routes.post('/user/login', LoginController.login)
routes.post('/user/create', LoginController.create)

routes.get('/spell/get', SpellController.getPaginated)
routes.get('/spell/getAll', SpellController.getAll)
routes.post('/spell/create', SpellController.create)

routes.get('/breed/get', BreedController.getPaginated)
routes.get('/breed/getAll', BreedController.getAll)
routes.post('/breed/create', BreedController.create)

routes.get('/classes/get', ClassesController.getPaginated)
routes.get('/classes/getAll', ClassesController.getAll)
routes.post('/classes/create', ClassesController.create)
routes.post('/classes/edit', ClassesController.edit)

routes.get('/characters/getAll', onlyAdmin,CharacterController.getAll)
routes.get('/characters/get', Oauth, CharacterController.get)
routes.post('/characters/create', Oauth, CharacterController.create)
routes.post('/characters/edit', CharacterController.edit)
export default routes
