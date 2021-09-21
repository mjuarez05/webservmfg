import {DefaultCrudRepository} from '@loopback/repository';
import {AsPospal, AsPospalRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AsPospalRepository extends DefaultCrudRepository<
  AsPospal,
  typeof AsPospal.prototype.id,
  AsPospalRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(AsPospal, dataSource);
  }
}
