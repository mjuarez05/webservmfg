import {DefaultCrudRepository} from '@loopback/repository';
import {Estados, EstadosRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EstadosRepository extends DefaultCrudRepository<
  Estados,
  typeof Estados.prototype.id,
  EstadosRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Estados, dataSource);
  }
}
