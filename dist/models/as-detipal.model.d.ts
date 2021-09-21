import { Entity } from '@loopback/repository';
export declare class AsDetipal extends Entity {
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
    idEstado: number;
    intervenido?: boolean;
    retenido?: boolean;
    obsintervenido?: string;
    obsretenido?: string;
    obspallet?: string;
    [prop: string]: any;
    constructor(data?: Partial<AsDetipal>);
}
export interface AsDetipalRelations {
}
export declare type AsDetipalWithRelations = AsDetipal & AsDetipalRelations;
