import * as jwt from 'jsonwebtoken'
import Oauth from '../controllers/OauthController'
import { Error } from '../controllers/ResponseController'
import { Request, Response, NextFunction } from 'express'

export default (req : Request, res : Response, next : NextFunction) : Response | void => {
  const token = req.headers.authorization
  if (Oauth.inBlackList(token)) {
    return res.status(403).json(
      new Error('Token Inválido', 102)
    )
  }
  if (!token) {
    return res.status(401).json(
      new Error('Token não informado', 103)
    )
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded : any) {
    if (err) {
      return res.status(403).json(
        new Error('Token Inválido', 104)
      )
    }
    req.params.userId = decoded.id
    next()
  })
}
