import { DefaultCrudRepository } from '@loopback/repository';
import { Ciudad, CiudadRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class CiudadRepository extends DefaultCrudRepository<Ciudad, typeof Ciudad.prototype.id, CiudadRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
