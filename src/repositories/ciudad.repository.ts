import {DefaultCrudRepository} from '@loopback/repository';
import {Ciudad, CiudadRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Ciudad, dataSource);
  }
}
