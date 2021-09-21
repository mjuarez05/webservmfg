import {DefaultCrudRepository} from '@loopback/repository';
import {AsProductos, AsProductosRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AsProductosRepository extends DefaultCrudRepository<
  AsProductos,
  typeof AsProductos.prototype.idPlanta,
  AsProductosRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(AsProductos, dataSource);
  }
}
