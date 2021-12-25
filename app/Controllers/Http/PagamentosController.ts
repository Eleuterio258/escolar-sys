
import Pagamento from '../../Models/Pagamento';


export default class PagamentosController {
  public async index({ response }) {
    const pagamento = await Pagamento.all();
    response.status(200).json(pagamento);
  }

  public async store ({response, request}) {
    const pagamento = await Pagamento.create(request.only(['mes','ano','multa','status','valor']));
    response.status(200).json(pagamento);
  }
}
