import {DefaultCrudRepository} from '@loopback/repository';
import {AsDetipal, AsDetipalRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AsDetipalRepository extends DefaultCrudRepository<
  AsDetipal,
  typeof AsDetipal.prototype.idPlanta,
  AsDetipalRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(AsDetipal, dataSource);
  }
}
