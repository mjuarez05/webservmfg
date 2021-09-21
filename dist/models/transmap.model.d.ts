import { Entity } from '@loopback/repository';
export declare class Transmap extends Entity {
    transid?: number;
    roleid?: number;
    id: number;
    [prop: string]: any;
    constructor(data?: Partial<Transmap>);
}
export interface TransmapRelations {
}
export declare type TransmapWithRelations = Transmap & TransmapRelations;
