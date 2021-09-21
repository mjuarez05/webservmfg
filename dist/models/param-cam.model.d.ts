import { Entity } from '@loopback/repository';
export declare class ParamCam extends Entity {
    id: number;
    idPlanta: number;
    numcam: number;
    col: number;
    fila: number;
    altura: number;
    pasillo: string;
    estado?: boolean;
    idGrupmat?: number;
    [prop: string]: any;
    constructor(data?: Partial<ParamCam>);
}
export interface ParamCamRelations {
}
export declare type ParamCamWithRelations = ParamCam & ParamCamRelations;
