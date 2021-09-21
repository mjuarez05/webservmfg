import { DefaultCrudRepository } from '@loopback/repository';
import { Acl, AclRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class AclRepository extends DefaultCrudRepository<Acl, typeof Acl.prototype.id, AclRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
