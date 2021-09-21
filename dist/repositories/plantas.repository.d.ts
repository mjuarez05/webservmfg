import { DefaultCrudRepository } from '@loopback/repository';
import { Plantas, PlantasRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class PlantasRepository extends DefaultCrudRepository<Plantas, typeof Plantas.prototype.id, PlantasRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
