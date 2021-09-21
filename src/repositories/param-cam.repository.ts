import {DefaultCrudRepository} from '@loopback/repository';
import {ParamCam, ParamCamRelations} from '../models';
import {MarfrigWebAppDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParamCamRepository extends DefaultCrudRepository<
  ParamCam,
  typeof ParamCam.prototype.id,
  ParamCamRelations
> {
  constructor(
    @inject('datasources.MarfrigWebApp') dataSource: MarfrigWebAppDataSource,
  ) {
    super(ParamCam, dataSource);
  }
}
