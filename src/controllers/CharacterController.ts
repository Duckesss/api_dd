import Player, { CharacterCreateRequest } from '../models/Player'
import Class from '../models/Class'
import Breed from '../models/Breed'
import { Request, Response } from 'express'
import { Error, Success } from './ResponseController'
const pageSize = 50

/**
 * Atributos private:
 */
const exists = async function (params) : Promise<boolean> {
  const encontrou = await Player.find({
    characters: params
  })
  return encontrou.length > 0
}

const getClass = async function (classID : string) : Promise<string> {
  const achou = await Class.findOne({ _id: classID })
  if (achou) return achou._id
  return ''
}
const getBreed = async function (breedID : string) : Promise<string> {
  const achou = await Breed.findOne({ _id: breedID })
  if (achou) return achou._id
  return ''
}

class CharacterController {
  public async create (req: CharacterCreateRequest, res: Response) {
    const { name } = req.body
    const parametrosObrigatorios = ['name', 'class', 'breed']
    const keysEnviadas = Object.keys(req.body)
    const parametrosCorretos = parametrosObrigatorios
      .every(param => keysEnviadas.includes(param))
    if (!parametrosCorretos) {
      return res.status(400).json(
        new Error(`Parâmetros Insuficientes, é necessário passar ${parametrosObrigatorios.join(',')}`, 215)
      )
    }

    if (!(await exists({ name }))) {
      const characterClass = await getClass(req.body.class)
      const characterBreed = await getBreed(req.body.breed)
      const player = await Player.findOne({ token: req.headers.authorization })
      const newCharacter = {
        ...req.body,
        class: characterClass,
        breed: characterBreed,
        level: 0
      }
      player.characters.push(newCharacter)
      await player.save()
      return res.json(new Success(player))
    } else {
      return res.status(400).json(
        new Error('Personagem já existente', 209)
      )
    }
  }

  public async edit (req : Request, res: Response) {
    const { name } = req.body
    const classeUpdated = await Player.findOneAndUpdate({
      'characters.name': name,
      token: req.headers.authorization
    }, {
      returnNewDocument: true,
      useFindAndModify: true,
      $set: {
        ...req.body,
        breed: await getBreed(req.body.breed),
        class: await getBreed(req.body.class)
      }
    }).populate('breed').populate('class').exec()
    return res.json(new Success(classeUpdated))
  }

  public async getAll (req: Request, res: Response) {
    const characters = await Character.find({}).populate('breed').populate('class').exec()
    return res.status(200).json(new Success(characters))
  }

  public async get (req: Request, res: Response) {
    const userData = await Player.findOne({
      token: req.headers.authorization
    }, 'characters')
      .populate({
        path: 'characters',
        populate: [
          { path: 'breed' },
          { path: 'class' }
        ]
      })
      .exec()
    return res.status(200).json(new Success(userData))
  }
}
export default new CharacterController()
