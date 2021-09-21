import { DefaultCrudRepository } from '@loopback/repository';
import { PrdTurnos, PrdTurnosRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class PrdTurnosRepository extends DefaultCrudRepository<PrdTurnos, typeof PrdTurnos.prototype.id, PrdTurnosRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
