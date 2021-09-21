import {DefaultCrudRepository} from '@loopback/repository';
import {GruposMat, GruposMatRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GruposMatRepository extends DefaultCrudRepository<
  GruposMat,
  typeof GruposMat.prototype.idPlanta,
  GruposMatRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(GruposMat, dataSource);
  }
}
