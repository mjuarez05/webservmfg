import {DefaultCrudRepository} from '@loopback/repository';
import {CodNumera, CodNumeraRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CodNumeraRepository extends DefaultCrudRepository<
  CodNumera,
  typeof CodNumera.prototype.id,
  CodNumeraRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(CodNumera, dataSource);
  }
}
