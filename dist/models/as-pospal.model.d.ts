import { Entity } from '@loopback/repository';
export declare class AsPospal extends Entity {
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
    constructor(data?: Partial<AsPospal>);
}
export interface AsPospalRelations {
}
export declare type AsPospalWithRelations = AsPospal & AsPospalRelations;
