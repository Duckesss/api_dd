
import { Schema, model, Document } from 'mongoose'
import { Request } from 'express'

const ClassSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

interface ClassModel extends Document{
  name:string;
  description:string;
}

interface ClassCreateRequest extends Request{
  body: ClassModel
}

export default model<ClassModel>('Class', ClassSchema)
export { ClassCreateRequest }
