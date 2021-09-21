import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Trxparam, TrxparamRelations, Plantas, Transaccion} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PlantasRepository} from './plantas.repository';
import {TransaccionRepository} from './transaccion.repository';

export class TrxparamRepository extends DefaultCrudRepository<
  Trxparam,
  typeof Trxparam.prototype.id,
  TrxparamRelations
> {

  public readonly planta: BelongsToAccessor<Plantas, typeof Trxparam.prototype.id>;

  public readonly trx: BelongsToAccessor<Transaccion, typeof Trxparam.prototype.id>;

  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource, @repository.getter('PlantasRepository') protected plantasRepositoryGetter: Getter<PlantasRepository>, @repository.getter('TransaccionRepository') protected transaccionRepositoryGetter: Getter<TransaccionRepository>,
  ) {
    super(Trxparam, dataSource);
    this.trx = this.createBelongsToAccessorFor('trx', transaccionRepositoryGetter,);
    this.registerInclusionResolver('trx', this.trx.inclusionResolver);
    this.planta = this.createBelongsToAccessorFor('planta', plantasRepositoryGetter,);
    this.registerInclusionResolver('planta', this.planta.inclusionResolver);
  }
}
