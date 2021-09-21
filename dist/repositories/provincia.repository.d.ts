import { DefaultCrudRepository } from '@loopback/repository';
import { Provincia, ProvinciaRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class ProvinciaRepository extends DefaultCrudRepository<Provincia, typeof Provincia.prototype.id, ProvinciaRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
