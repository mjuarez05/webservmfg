import {DefaultCrudRepository} from '@loopback/repository';
import {KNA1, Kna1Relations} from '../models';
import {SapDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class Kna1Repository extends DefaultCrudRepository<
  KNA1,
  typeof KNA1.prototype.KUNNR,
  Kna1Relations
> {
  constructor(@inject('datasources.sap') dataSource: SapDataSource) {
    super(KNA1, dataSource);
  }
}
