import { Entity } from '@loopback/repository';
export declare class AsConspal extends Entity {
    id: number;
    idPlanta: number;
    idNumpal: number;
    idUsuario: number;
    idProducto: string;
    knetos: number;
    haper: string;
    hcierr: string;
    cantbolsas?: number;
    idArea: number;
    [prop: string]: any;
    constructor(data?: Partial<AsConspal>);
}
export interface AsConspalRelations {
}
export declare type AsConspalWithRelations = AsConspal & AsConspalRelations;
