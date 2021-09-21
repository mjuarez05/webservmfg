import { Entity } from '@loopback/repository';
export declare class Ciudad extends Entity {
    id: number;
    ciudadNombre?: string;
    cp?: number;
    provinciaId?: number;
    [prop: string]: any;
    constructor(data?: Partial<Ciudad>);
}
export interface CiudadRelations {
}
export declare type CiudadWithRelations = Ciudad & CiudadRelations;
