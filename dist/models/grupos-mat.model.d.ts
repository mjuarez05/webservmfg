import { Entity } from '@loopback/repository';
export declare class GruposMat extends Entity {
    idPlanta: number;
    id: number;
    descr: string;
    [prop: string]: any;
    constructor(data?: Partial<GruposMat>);
}
export interface GruposMatRelations {
}
export declare type GruposMatWithRelations = GruposMat & GruposMatRelations;
