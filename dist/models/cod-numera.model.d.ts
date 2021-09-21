import { Entity } from '@loopback/repository';
export declare class CodNumera extends Entity {
    id: number;
    idPlanta: number;
    numdde: number;
    numhta: number;
    ultusado: number;
    renovauto: boolean;
    descr: string;
    [prop: string]: any;
    constructor(data?: Partial<CodNumera>);
}
export interface CodNumeraRelations {
}
export declare type CodNumeraWithRelations = CodNumera & CodNumeraRelations;
