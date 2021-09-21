import { Entity } from '@loopback/repository';
export declare class Empresa extends Entity {
    id: number;
    nombre?: string;
    cuit?: string;
    [prop: string]: any;
    constructor(data?: Partial<Empresa>);
}
export interface EmpresaRelations {
}
export declare type EmpresaWithRelations = Empresa & EmpresaRelations;
