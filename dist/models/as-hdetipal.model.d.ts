import { Entity } from '@loopback/repository';
export declare class AsHdetipal extends Entity {
    idPlanta: number;
    numpal: number;
    idArea: number;
    ptoPes: number;
    fechorPes: string;
    idTurno: number;
    idProd: string;
    unidades: number;
    taraPal: number;
    taraBolsa: number;
    kneto: number;
    kbruto: number;
    fecProd: string;
    fecCong: string;
    fecVenc: string;
    idUsuario: number;
    lote: string;
    horaAper: string;
    horaCierre: string;
    secuencia: number;
    numbal?: number;
    idEstado: number;
    idTipomov: number;
    [prop: string]: any;
    constructor(data?: Partial<AsHdetipal>);
}
export interface AsHdetipalRelations {
}
export declare type AsHdetipalWithRelations = AsHdetipal & AsHdetipalRelations;
