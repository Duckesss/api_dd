import Breed, { BreedCreateRequest, GetPaginated } from '../models/Breed'
import { Request, Response } from 'express'
import { Error, Success } from './ResponseController'
const pageSize = 50

/**
 * Atributos private:
 */
const exists = async function (params) : Promise<boolean> {
  const encontrou = await Breed.find(params)
  return encontrou.length > 0
}

class BreedController {
  public async create (req: BreedCreateRequest, res: Response) {
    const { name } = req.body
    const parametrosObrigatorios = ['name', 'description']
    const keysEnviadas = Object.keys(req.body)
    const parametrosCorretos = parametrosObrigatorios
      .every(param => keysEnviadas.includes(param))
    if (!parametrosCorretos) {
      return res.status(400).json(
        new Error(`Parâmetros Insuficientes, é necessário passar ${parametrosObrigatorios.join(',')}`, 206)
      )
    }
    if (!(await exists({ name }))) {
      const novaRaca = new Breed(req.body)
      await novaRaca.save()
      return res.json(new Success(novaRaca))
    } else {
      return res.status(400).json(
        new Error('Raça já existente', 207)
      )
    }
  }

  public async getPaginated (req: GetPaginated, res: Response) {
    let skip = 0
    const limit = pageSize
    if (req.query.page) {
      skip = pageSize * (Number(req.query.page) - 1)
    }
    const racas = await Breed.find({}).skip(skip).limit(limit)
    return res.status(200).json(new Success(racas))
  }

  public async getAll (req: Request, res: Response) {
    const racas = await Breed.find({})
    return res.status(200).json(new Success(racas))
  }
}
export default new BreedController()
