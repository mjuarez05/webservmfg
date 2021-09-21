import { DefaultCrudRepository } from '@loopback/repository';
import { Transaccion, TransaccionRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class TransaccionRepository extends DefaultCrudRepository<Transaccion, typeof Transaccion.prototype.id, TransaccionRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
