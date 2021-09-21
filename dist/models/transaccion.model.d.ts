import { Entity } from '@loopback/repository';
export declare class Transaccion extends Entity {
    name: string;
    trx: string;
    icon?: string;
    component: string;
    menuid?: number;
    id: number;
    [prop: string]: any;
    constructor(data?: Partial<Transaccion>);
}
export interface TransaccionRelations {
}
export declare type TransaccionWithRelations = Transaccion & TransaccionRelations;
