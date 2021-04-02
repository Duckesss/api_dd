import mongoose, { Schema, model, Document } from 'mongoose'
import { Request } from 'express'

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean
  },
  characters: [{
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
  }]
}, {
  timestamps: true
})

interface CharacterModel{
  name:string;
  class: string;
  breed: string;
  level: number;
  items?: string[];
}

interface PlayerModel extends Document{
  name:string;
  username:string;
  password:string;
  admin?:boolean;
  token?:string;
  characters?:CharacterModel[];
}

interface PlayerCreateRequest extends Request{
  body: PlayerModel
}

interface LoginRequest extends Request{
  body: {
    username:string;
    password:string;
  }
}

interface CharacterCreateRequest extends Request{
  body: CharacterModel
}

export default model<PlayerModel>('Player', PlayerSchema)
export { PlayerCreateRequest, LoginRequest, PlayerModel }
export { CharacterCreateRequest, CharacterModel }
