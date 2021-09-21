import { DefaultCrudRepository } from '@loopback/repository';
import { Usuario, UsuarioRelations } from '../models';
import { MarfrigWebAppDataSource } from '../datasources';
export declare class UsuarioRepository extends DefaultCrudRepository<Usuario, typeof Usuario.prototype.id, UsuarioRelations> {
    constructor(dataSource: MarfrigWebAppDataSource);
}
