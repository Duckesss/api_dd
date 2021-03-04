
import mongoose, { Schema, model, Document } from 'mongoose'
import { Request } from 'express'

const ClassSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  spells: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spell',
    required: false
  }],
  subclasses: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

interface ClassModel extends Document{
  name:string;
  description:string;
  spells?:string | string[];
  subclasses?: {
    name: string;
    description: string
  }[]
}

interface GetPaginated extends Request{
  query:{
    page: string
  }
}

interface ClassCreateRequest extends Request{
  body: ClassModel
}

export default model<ClassModel>('Class', ClassSchema)
export { ClassCreateRequest, GetPaginated, ClassModel }
