import { Entity } from '@loopback/repository';
export declare class Estados extends Entity {
    id: number;
    idPlanta: number;
    descr: string;
    [prop: string]: any;
    constructor(data?: Partial<Estados>);
}
export interface EstadosRelations {
}
export declare type EstadosWithRelations = Estados & EstadosRelations;
