import {DefaultCrudRepository} from '@loopback/repository';
import {Areas, AreasRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AreasRepository extends DefaultCrudRepository<
  Areas,
  typeof Areas.prototype.id,
  AreasRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Areas, dataSource);
  }
}
