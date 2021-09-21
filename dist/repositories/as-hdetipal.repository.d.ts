import { DefaultCrudRepository } from '@loopback/repository';
import { AsHdetipal, AsHdetipalRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class AsHdetipalRepository extends DefaultCrudRepository<AsHdetipal, typeof AsHdetipal.prototype.idPlanta, AsHdetipalRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
