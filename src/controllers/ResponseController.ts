/**
 * Códigos de 1xx -> Não autorizado: Autenticação Falhou / Problemas em headers
 * Códigos de 2xx -> Bad Request: Parametros errados
 */

class BaseResponse {
  constructor (
        private erro : boolean,
        private message : string | undefined
  ) {}

  public getErro () : boolean {
    return this.erro
  }

  public getMessage () : string | undefined {
    return this.message
  }
}

class ErrorHandler extends BaseResponse {
  constructor (
    message : string,
    private code : number
  ) {
    super(true, message)
    this.code = code
  }

  public what () : void {
    console.log(this.getMessage(), this.code)
  }

  public json () : Record<string, string | number | boolean> {
    return {
      erro: this.getErro(),
      message: this.getMessage(),
      code: this.code
    }
  }
}

class SuccessHandler extends BaseResponse {
  constructor (
    private data : any,
    message = ''
  ) {
    super(false, message)
    this.data = data
  }
}

export { ErrorHandler as Error, SuccessHandler as Success }
