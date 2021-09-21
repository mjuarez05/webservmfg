import { DefaultCrudRepository } from '@loopback/repository';
import { Unimed, UnimedRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class UnimedRepository extends DefaultCrudRepository<Unimed, typeof Unimed.prototype.id, UnimedRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
