import { DefaultCrudRepository } from '@loopback/repository';
import { Accesstoken, AccesstokenRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class AccesstokenRepository extends DefaultCrudRepository<Accesstoken, typeof Accesstoken.prototype.id, AccesstokenRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
