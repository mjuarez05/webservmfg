import {DefaultCrudRepository} from '@loopback/repository';
import {Plantas, PlantasRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlantasRepository extends DefaultCrudRepository<
  Plantas,
  typeof Plantas.prototype.id,
  PlantasRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Plantas, dataSource);
  }
}
