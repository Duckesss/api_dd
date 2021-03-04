
import { Schema, model, Document } from 'mongoose'
import { Request } from 'express'

const BreedSchema = new Schema({
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

interface BreedModel extends Document{
  name:string;
  description:string;
}

interface BreedCreateRequest extends Request{
  body: BreedModel
}
interface GetPaginated extends Request{
  query:{
    page: string;
  }
}

export default model<BreedModel>('Breed', BreedSchema)
export { BreedCreateRequest, BreedModel, GetPaginated }
