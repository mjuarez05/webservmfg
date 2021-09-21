import {DefaultCrudRepository} from '@loopback/repository';
import {Accesstoken, AccesstokenRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AccesstokenRepository extends DefaultCrudRepository<
  Accesstoken,
  typeof Accesstoken.prototype.id,
  AccesstokenRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Accesstoken, dataSource);
  }
}
