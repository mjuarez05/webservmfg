import { DefaultCrudRepository } from '@loopback/repository';
import { AsDetipal, AsDetipalRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class AsDetipalRepository extends DefaultCrudRepository<AsDetipal, typeof AsDetipal.prototype.idPlanta, AsDetipalRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
