import {DefaultCrudRepository} from '@loopback/repository';
import {AsConspal, AsConspalRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AsConspalRepository extends DefaultCrudRepository<
  AsConspal,
  typeof AsConspal.prototype.id,
  AsConspalRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(AsConspal, dataSource);
  }
}
