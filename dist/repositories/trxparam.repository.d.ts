import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Trxparam, TrxparamRelations, Plantas, Transaccion } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { PlantasRepository } from './plantas.repository';
import { TransaccionRepository } from './transaccion.repository';
export declare class TrxparamRepository extends DefaultCrudRepository<Trxparam, typeof Trxparam.prototype.id, TrxparamRelations> {
    protected plantasRepositoryGetter: Getter<PlantasRepository>;
    protected transaccionRepositoryGetter: Getter<TransaccionRepository>;
    readonly planta: BelongsToAccessor<Plantas, typeof Trxparam.prototype.id>;
    readonly trx: BelongsToAccessor<Transaccion, typeof Trxparam.prototype.id>;
    constructor(dataSource: MarfrigWebAppDataSource, plantasRepositoryGetter: Getter<PlantasRepository>, transaccionRepositoryGetter: Getter<TransaccionRepository>);
}
