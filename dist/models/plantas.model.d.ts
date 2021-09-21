import { Entity } from '@loopback/repository';
export declare class Plantas extends Entity {
    id: number;
    empresa: number;
    sucursal?: number;
    descripcion: string;
    oncca?: string;
    senasa?: string;
    numplant: number;
    direccion: string;
    idProvincia: number;
    idCiudad: number;
    [prop: string]: any;
    constructor(data?: Partial<Plantas>);
}
export interface PlantasRelations {
}
export declare type PlantasWithRelations = Plantas & PlantasRelations;
