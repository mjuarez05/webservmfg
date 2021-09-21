import { Entity } from '@loopback/repository';
export declare class Trxparam extends Entity {
    descr: string;
    valor: string;
    id: number;
    id_planta: number;
    id_trx: number;
    [prop: string]: any;
    constructor(data?: Partial<Trxparam>);
}
export interface TrxparamRelations {
}
export declare type TrxparamWithRelations = Trxparam & TrxparamRelations;
