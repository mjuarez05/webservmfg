import { DefaultCrudRepository } from '@loopback/repository';
import { Empresa, EmpresaRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class EmpresaRepository extends DefaultCrudRepository<Empresa, typeof Empresa.prototype.id, EmpresaRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
