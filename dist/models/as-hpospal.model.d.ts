import { Entity } from '@loopback/repository';
export declare class AsHpospal extends Entity {
    idPlanta: number;
    numpal: number;
    usuario: number;
    fecha: string;
    idCamara: number;
    col: number;
    fila: number;
    altura: number;
    estado: boolean;
    idArea: number;
    id: number;
    [prop: string]: any;
    constructor(data?: Partial<AsHpospal>);
}
export interface AsHpospalRelations {
}
export declare type AsHpospalWithRelations = AsHpospal & AsHpospalRelations;
