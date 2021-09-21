import { DefaultCrudRepository } from '@loopback/repository';
import { Rolemapping, RolemappingRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class RolemappingRepository extends DefaultCrudRepository<Rolemapping, typeof Rolemapping.prototype.id, RolemappingRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
