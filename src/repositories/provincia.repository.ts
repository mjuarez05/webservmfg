import {DefaultCrudRepository} from '@loopback/repository';
import {Provincia, ProvinciaRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProvinciaRepository extends DefaultCrudRepository<
  Provincia,
  typeof Provincia.prototype.id,
  ProvinciaRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Provincia, dataSource);
  }
}
