import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Trxparam, Plantas} from '../models';
import {TrxparamRepository} from '../repositories';

export class TrxparamPlantasController {
  constructor(
    @repository(TrxparamRepository)
    public trxparamRepository: TrxparamRepository,
  ) {}

  @get('/trxparams/{id}/plantas', {
    responses: {
      '200': {
        description: 'Plantas belonging to Trxparam',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plantas)},
          },
        },
      },
    },
  })
  async getPlantas(
    @param.path.number('id') id: typeof Trxparam.prototype.id,
  ): Promise<Plantas> {
    return this.trxparamRepository.planta(id);
  }
}
