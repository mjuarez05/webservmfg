import {DefaultCrudRepository} from '@loopback/repository';
import {AsHdetipal, AsHdetipalRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AsHdetipalRepository extends DefaultCrudRepository<
  AsHdetipal,
  typeof AsHdetipal.prototype.idPlanta,
  AsHdetipalRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(AsHdetipal, dataSource);
  }
}
