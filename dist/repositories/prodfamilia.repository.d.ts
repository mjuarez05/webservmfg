import { DefaultCrudRepository } from '@loopback/repository';
import { Prodfamilia, ProdfamiliaRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class ProdfamiliaRepository extends DefaultCrudRepository<Prodfamilia, typeof Prodfamilia.prototype.id, ProdfamiliaRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
