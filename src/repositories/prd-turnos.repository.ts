import {DefaultCrudRepository} from '@loopback/repository';
import {PrdTurnos, PrdTurnosRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PrdTurnosRepository extends DefaultCrudRepository<
  PrdTurnos,
  typeof PrdTurnos.prototype.id,
  PrdTurnosRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(PrdTurnos, dataSource);
  }
}
