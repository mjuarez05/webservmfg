import { DefaultCrudRepository } from '@loopback/repository';
import { GruposMat, GruposMatRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class GruposMatRepository extends DefaultCrudRepository<GruposMat, typeof GruposMat.prototype.idPlanta, GruposMatRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
