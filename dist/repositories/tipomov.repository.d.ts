import { DefaultCrudRepository } from '@loopback/repository';
import { Tipomov, TipomovRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class TipomovRepository extends DefaultCrudRepository<Tipomov, typeof Tipomov.prototype.tipo, TipomovRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
