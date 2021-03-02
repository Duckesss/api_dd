
import { Schema, model, Document } from 'mongoose'
import { Request } from 'express'

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean
  }
}, {
  timestamps: true
})

interface PlayerModel extends Document{
  name:string;
  login:string;
  password:string;
  admin?:boolean;
}

interface PlayerCreateRequest extends Request{
  body: PlayerModel
}

export default model<PlayerModel>('Player', PlayerSchema)
export { PlayerCreateRequest }
