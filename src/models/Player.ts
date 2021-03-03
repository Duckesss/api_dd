
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
  character: {
    type: {
      breed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Breed',
        required: true
      },
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
      }
    }
  }
}, {
  timestamps: true
})

interface PlayerModel extends Document{
  name:string;
  username:string;
  password:string;
  admin?:boolean;
  token?:string;
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

export default model<PlayerModel>('Player', PlayerSchema)
export { PlayerCreateRequest, LoginRequest, PlayerModel }
