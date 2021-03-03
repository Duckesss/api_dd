import * as jwt from 'jsonwebtoken'

class Oauth {
  private tokenBlockList : Record<string, boolean>
  constructor () {
    this.tokenBlockList = {}
  }

  /**
    * Retorna um novo token que codifica o @id
    */
  public getNewToken (id : string) : string {
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 6000 // 600 minutos = 10 horas
    })
    return token
  }

  /**
    * Adiciona o @token à blacklist
    */
  public addBlackList (token : string) : void {
    this.tokenBlockList[token] = true
  }

  /**
    * Verifica se o @token está na blacklist dos tokens
    */
  public inBlackList (token: string) : boolean {
    return this.tokenBlockList[token]
  }
}
export default new Oauth()
