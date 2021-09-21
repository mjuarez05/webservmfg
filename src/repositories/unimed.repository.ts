import {DefaultCrudRepository} from '@loopback/repository';
import {Unimed, UnimedRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UnimedRepository extends DefaultCrudRepository<
  Unimed,
  typeof Unimed.prototype.id,
  UnimedRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Unimed, dataSource);
  }
}
