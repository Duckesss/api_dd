import Character, { CharacterCreateRequest } from '../models/Character'
import Class from '../models/Class'
import Breed from '../models/Breed'
import { Request, Response } from 'express'
import { Error, Success } from './ResponseController'
import Oauth from './OauthController'
const pageSize = 50

/**
 * Atributos private:
 */
const exists = async function (params) : Promise<boolean> {
  const encontrou = await Character.find(params)
  return encontrou.length > 0
}

const getClass = async function (className : string) : Promise<string[]> {
  const achou = await Class.find({ name: className })
  if (achou) return achou.map(e => e._id)
  return undefined
}
const getBreed = async function (breedName : string) : Promise<string[]> {
  const achou = await Breed.find({ name: breedName })
  if (achou) return achou.map(e => e._id)
  return undefined
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
      const newCharacter = new Character({
        ...req.body,
        breed: characterClass,
        class: characterBreed,
        level: 0
      })
      await newCharacter.save()
      return res.json(new Success(newCharacter))
    } else {
      return res.status(400).json(
        new Error('Personagem já existente', 209)
      )
    }
  }

  public async edit (req : Request, res: Response) {
    const { name } = req.body
    const classeUpdated = await Character.findOneAndUpdate({ name }, {
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
}
export default new CharacterController()
