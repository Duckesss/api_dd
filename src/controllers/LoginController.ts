import Player, { PlayerCreateRequest, LoginRequest, PlayerModel } from '../models/Player'
import { Request, Response } from 'express'
import { Error, Success } from './ResponseController'
import Oauth from './OauthController'

/**
 * Atributos private:
 */

const exists = async function (params) : Promise<boolean> {
  const encontrou = await Player.find(params)
  return encontrou.length > 0
}

const getUser = async function (params) : Promise<PlayerModel> {
  const encontrou = await Player.findOne(params)
  return encontrou
}

class LoginController {
  public async login (req: LoginRequest, res : Response) {
    const { username, password } = req.body
    const usuario = await getUser({ username, password })
    if (usuario) {
      const token = Oauth.getNewToken(usuario._id)
      await Player.updateOne({ username, password }, {
        $set: { token }
      })
      return res.status(200).json(new Success({ token }, 'Usuario logado com sucesso'))
    } else {
      return res.status(200).json(
        new Success({}, 'Usuário não encontrado')
      )
    }
  }

  public async get (req: Request, res: Response) {
    const usuario = await getUser(req.params)
    return res.status(200).json(new Success(usuario))
  }

  public async getAll (req: Request, res: Response) {
    const usuarios = await Player.find({})
    return res.status(200).json(new Success(usuarios))
  }

  public async create (req: PlayerCreateRequest, res: Response) {
    const { username, password } = req.body
    const parametrosObrigatorios = ['name', 'username', 'password']
    const keysEnviadas = Object.keys(req.body)
    const parametrosCorretos = parametrosObrigatorios
      .every(param => keysEnviadas.includes(param) && req.body[param])
    if (!parametrosCorretos) {
      return res.status(400).json(
        new Error(`Parâmetros Insuficientes, é necessário passar ${parametrosObrigatorios.join(',')}`, 203)
      )
    }
    if (!(await exists({ username, password }))) {
      const novoPlayer = new Player(req.body)
      await novoPlayer.save()
      return res.json(new Success(novoPlayer))
    } else {
      return res.json(
        new Success({})
      )
    }
  }
}

export default new LoginController()
export {exists, getUser}