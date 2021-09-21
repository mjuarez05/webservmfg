import { DefaultCrudRepository } from '@loopback/repository';
import { AsProductos, AsProductosRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class AsProductosRepository extends DefaultCrudRepository<AsProductos, typeof AsProductos.prototype.idPlanta, AsProductosRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
