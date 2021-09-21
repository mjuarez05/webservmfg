import { Entity } from '@loopback/repository';
export declare class PrdTurnos extends Entity {
    id: number;
    idPlanta: number;
    descr: string;
    desde?: string;
    hasta?: string;
    [prop: string]: any;
    constructor(data?: Partial<PrdTurnos>);
}
export interface PrdTurnosRelations {
}
export declare type PrdTurnosWithRelations = PrdTurnos & PrdTurnosRelations;
