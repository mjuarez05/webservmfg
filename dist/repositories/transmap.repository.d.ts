import { DefaultCrudRepository } from '@loopback/repository';
import { Transmap, TransmapRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class TransmapRepository extends DefaultCrudRepository<Transmap, typeof Transmap.prototype.id, TransmapRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
