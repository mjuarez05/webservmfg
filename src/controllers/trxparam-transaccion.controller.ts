import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Trxparam, Transaccion} from '../models';
import {TrxparamRepository} from '../repositories';

export class TrxparamTransaccionController {
  constructor(
    @repository(TrxparamRepository)
    public trxparamRepository: TrxparamRepository,
  ) {}

  @get('/trxparams/{id}/transaccion', {
    responses: {
      '200': {
        description: 'Transaccion belonging to Trxparam',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaccion)},
          },
        },
      },
    },
  })
  async getTransaccion(
    @param.path.number('id') id: typeof Trxparam.prototype.id,
  ): Promise<Transaccion> {
    return this.trxparamRepository.trx(id);
  }
}
