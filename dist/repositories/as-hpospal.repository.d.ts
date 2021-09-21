import { DefaultCrudRepository } from '@loopback/repository';
import { AsHpospal, AsHpospalRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class AsHpospalRepository extends DefaultCrudRepository<AsHpospal, typeof AsHpospal.prototype.id, AsHpospalRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
