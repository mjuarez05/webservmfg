import { DefaultCrudRepository } from '@loopback/repository';
import { AsConspal, AsConspalRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class AsConspalRepository extends DefaultCrudRepository<AsConspal, typeof AsConspal.prototype.id, AsConspalRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
