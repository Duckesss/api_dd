
import { Schema, model, Document } from 'mongoose'
import { Request } from 'express'

const SpellSchema = new Schema({
  level: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  effect: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

interface SpellModel extends Document{
  level:number;
  name:string;
  requirements:string;
  effect:string;
}

interface SpellCreateRequest extends Request{
  body: SpellModel
}

export default model<SpellModel>('Spell', SpellSchema)
export { SpellCreateRequest }
