/**
 * Códigos de 1xx -> Não autorizado: Autenticação Falhou / Problemas em headers
 * Códigos de 2xx -> Bad Request: Parametros errados
 */
class ErrorHandler {
  constructor (
        private message : string,
        private code : number
  ) {}

  public what () : void {
    console.log(this.message, this.code)
  }

  public json () : Record<string, string | number> {
    return {
      message: this.message,
      code: this.code
    }
  }
}

export default ErrorHandler
