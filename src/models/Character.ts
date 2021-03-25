import mongoose, { Schema, model, Document } from 'mongoose'
import { Request } from 'express'

const CharacterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  breed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Breed',
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  items: [{
    type: String,
    required: false
  }],
  photo: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

interface CharacterModel extends Document{
  name:string;
  class: string;
  breed: string;
  level: number;
  items?: string[];
}

interface CharacterCreateRequest extends Request{
  body: CharacterModel
}

export default model<CharacterModel>('Character', CharacterSchema)
export { CharacterCreateRequest, CharacterModel }
