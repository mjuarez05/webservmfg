import { DefaultCrudRepository } from '@loopback/repository';
import { ParamCam, ParamCamRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class ParamCamRepository extends DefaultCrudRepository<ParamCam, typeof ParamCam.prototype.id, ParamCamRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
