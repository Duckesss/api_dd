import { Request, Response } from 'express'
import Spell, { SpellCreateRequest, GetPaginated } from '../models/Spell'
import Error from './ErrorController'
const pageSize = 50

const exists = async function (params) : Promise<boolean> {
  const encontrou = await Spell.find(params)
  return encontrou.length > 0
}

class SpellController {
  public async getPaginated (req: GetPaginated, res: Response) {
    let skip = 0
    const limit = pageSize
    if (req.query.page) {
      skip = pageSize * (Number(req.query.page) - 1)
    }
    const spells = await Spell.find({}).skip(skip).limit(limit)
    return res.status(200).json(spells)
  }

  public async getAll (req: Request, res: Response) {
    const spells = await Spell.find({})
    return res.status(200).json(spells)
  }

  public async create (req: SpellCreateRequest, res: Response) {
    const { level, name } = req.body
    const parametrosObrigatorios = ['level', 'name', 'effect']
    const keysEnviadas = Object.keys(req.body)
    const parametrosCorretos = parametrosObrigatorios
      .every(param => keysEnviadas.includes(param))
    if (!parametrosCorretos) {
      return res.status(400).json(
        new Error(`Parâmetros Insuficientes, é necessário passar ${parametrosObrigatorios.join(',')}`, 204)
      )
    }
    if (!(await exists({ level, name }))) {
      const novaSpell = new Spell(req.body)
      await novaSpell.save()
      return res.json(novaSpell)
    } else {
      return res.status(400).json(
        new Error('Magia já existente', 205)
      )
    }
  }
}

export default new SpellController()
