import { Entity } from '@loopback/repository';
export declare class Provincia extends Entity {
    id: number;
    provinciaNombre?: string;
    [prop: string]: any;
    constructor(data?: Partial<Provincia>);
}
export interface ProvinciaRelations {
}
export declare type ProvinciaWithRelations = Provincia & ProvinciaRelations;
