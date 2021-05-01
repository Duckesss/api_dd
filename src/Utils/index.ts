class Error {
    private message : string;
    private code : number;
    /** Dicionário com a relação do primeiro digito com o tipo do erro */
    private dicionarioErro = {
      1: 'Parâmetros Inválidos'
    }

    constructor (err: string, code:number) {
      this.message = err
      this.code = code
    }

    show () : void {
      console.log(this.message, this.dicionarioErro[String(this.code)[0]], this.code)
    }
}

class Utils {
  private dice (max : number) {
    const min = 1
    const resultado = Math.floor(Math.random() * (max - min + 1) + min);
    return resultado
  }

  roll (faces : number, rolls : number, critical = 6) {
    if (critical > faces) throw new Error('Crítico inválido', 101)
    let acertos = 0
    for (let i = 0; i < rolls; i++) {
      const result = this.dice(faces)
      if (result % 2 === 0) ++acertos
      if (result === critical) --i
    }
    return acertos
  }
}

export default new Utils()
export { Error }
