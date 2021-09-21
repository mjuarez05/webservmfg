import {DefaultCrudRepository} from '@loopback/repository';
import {Tipomov, TipomovRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TipomovRepository extends DefaultCrudRepository<
  Tipomov,
  typeof Tipomov.prototype.tipo,
  TipomovRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Tipomov, dataSource);
  }
}
