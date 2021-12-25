
import Pagamento from "../../Models/Pagamento";

import Env from '@ioc:Adonis/Core/Env'

export default class PagamentosController {
  public async index({ response }) {
    const pagamento = await Pagamento.all();
    response.status(200).json(pagamento);
  }

  public async pay({ response }) {

  }
}
