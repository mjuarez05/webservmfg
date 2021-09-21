import { DefaultCrudRepository } from '@loopback/repository';
import { KNA1, Kna1Relations } from '../models';
import { SapDataSource } from '../datasources';
export declare class Kna1Repository extends DefaultCrudRepository<KNA1, typeof KNA1.prototype.KUNNR, Kna1Relations> {
    constructor(dataSource: SapDataSource);
}
