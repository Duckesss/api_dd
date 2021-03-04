import Class, { ClassCreateRequest, ClassModel, GetPaginated } from '../models/Class'
import Spell from '../models/Spell'
import { Request, Response } from 'express'
import Error from './ErrorController'
import Oauth from './OauthController'
const pageSize = 50

/**
 * Atributos private:
 */
const exists = async function (params) : Promise<boolean> {
  const encontrou = await Class.find(params)
  return encontrou.length > 0
}

const getSpells = async function (spellName : string | string[] | undefined) : Promise<string[]> {
  if (!spellName) return undefined
  let spell
  if (typeof spellName === 'string') {
    spell = await Spell.find({ name: spellName })
  } else {
    const searchSpell = spellName.map(name => ({ name }))
    spell = await Spell.find({
      $or: searchSpell
    })
  }
  return spell.map(e => e._id)
}

class ClassController {
  public async create (req: ClassCreateRequest, res: Response) {
    const { name } = req.body
    const parametrosObrigatorios = ['name', 'description']
    const keysEnviadas = Object.keys(req.body)
    const parametrosCorretos = parametrosObrigatorios
      .every(param => keysEnviadas.includes(param))
    if (!parametrosCorretos) {
      return res.status(400).json(
        new Error(`Parâmetros Insuficientes, é necessário passar ${parametrosObrigatorios.join(',')}`, 208)
      )
    }
    if (!(await exists({ name }))) {
      let spells
      if (req.body.spells) {
        spells = await getSpells(req.body.spells)
      }
      const novaClasse = new Class({ ...req.body, spells })
      await novaClasse.save()
      return res.json(novaClasse)
    } else {
      return res.status(400).json(
        new Error('Classe já existente', 209)
      )
    }
  }

  public async edit (req : Request, res: Response) {
    const { name } = req.body
    const classeUpdated = await Class.findOneAndUpdate({ name }, {
      returnNewDocument: true,
      useFindAndModify: true,
      $set: {
        ...req.body,
        spells: await getSpells(req.body.spells)
      }
    }).populate('spells').exec()
    return res.json(classeUpdated)
  }

  public async getPaginated (req: GetPaginated, res: Response) {
    let skip = 0
    const limit = pageSize
    if (req.query.page) {
      skip = pageSize * (Number(req.query.page) - 1)
    }
    const classes = await Class.find({}).skip(skip).limit(limit).populate('spells').exec()
    return res.status(200).json(classes)
  }

  public async getAll (req: Request, res: Response) {
    const classes = await Class.find({}).populate('spells').exec()
    return res.status(200).json(classes)
  }
}
export default new ClassController()
