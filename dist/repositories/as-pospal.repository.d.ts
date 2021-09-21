import { DefaultCrudRepository } from '@loopback/repository';
import { AsPospal, AsPospalRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class AsPospalRepository extends DefaultCrudRepository<AsPospal, typeof AsPospal.prototype.id, AsPospalRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
