import { Entity } from '@loopback/repository';
export declare class Areas extends Entity {
    id: number;
    idPlanta: number;
    descr: string;
    [prop: string]: any;
    constructor(data?: Partial<Areas>);
}
export interface AreasRelations {
}
export declare type AreasWithRelations = Areas & AreasRelations;
