import { Entity } from '@loopback/repository';
export declare class Tipomov extends Entity {
    tipo: number;
    idPlanta: number;
    descr: string;
    [prop: string]: any;
    constructor(data?: Partial<Tipomov>);
}
export interface TipomovRelations {
}
export declare type TipomovWithRelations = Tipomov & TipomovRelations;
