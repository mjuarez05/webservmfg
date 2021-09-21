import {DefaultCrudRepository} from '@loopback/repository';
import {Prodfamilia, ProdfamiliaRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProdfamiliaRepository extends DefaultCrudRepository<
  Prodfamilia,
  typeof Prodfamilia.prototype.id,
  ProdfamiliaRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(Prodfamilia, dataSource);
  }
}
