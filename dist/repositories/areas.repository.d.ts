import { DefaultCrudRepository } from '@loopback/repository';
import { Areas, AreasRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class AreasRepository extends DefaultCrudRepository<Areas, typeof Areas.prototype.id, AreasRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
