import {DefaultCrudRepository} from '@loopback/repository';
import {Transmap, TransmapRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TransmapRepository extends DefaultCrudRepository<
  Transmap,
  typeof Transmap.prototype.id,
  TransmapRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Transmap, dataSource);
  }
}
