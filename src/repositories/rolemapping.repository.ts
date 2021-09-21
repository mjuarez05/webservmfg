import {DefaultCrudRepository} from '@loopback/repository';
import {Rolemapping, RolemappingRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RolemappingRepository extends DefaultCrudRepository<
  Rolemapping,
  typeof Rolemapping.prototype.id,
  RolemappingRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Rolemapping, dataSource);
  }
}
