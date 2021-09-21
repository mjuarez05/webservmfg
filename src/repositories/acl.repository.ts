import {DefaultCrudRepository} from '@loopback/repository';
import {Acl, AclRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AclRepository extends DefaultCrudRepository<
  Acl,
  typeof Acl.prototype.id,
  AclRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Acl, dataSource);
  }
}
