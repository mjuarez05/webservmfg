import { DefaultCrudRepository } from '@loopback/repository';
import { CodNumera, CodNumeraRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class CodNumeraRepository extends DefaultCrudRepository<CodNumera, typeof CodNumera.prototype.id, CodNumeraRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
