import {DefaultCrudRepository} from '@loopback/repository';
import {AsHpospal, AsHpospalRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AsHpospalRepository extends DefaultCrudRepository<
  AsHpospal,
  typeof AsHpospal.prototype.id,
  AsHpospalRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(AsHpospal, dataSource);
  }
}
