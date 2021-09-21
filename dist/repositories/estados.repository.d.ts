import { DefaultCrudRepository } from '@loopback/repository';
import { Estados, EstadosRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class EstadosRepository extends DefaultCrudRepository<Estados, typeof Estados.prototype.id, EstadosRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
