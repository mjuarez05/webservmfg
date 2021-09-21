import { Entity } from '@loopback/repository';
export declare class AsProductos extends Entity {
    idPlanta: number;
    codsap: string;
    descrMat: string;
    descrGen: string;
    cantcaj: number;
    taraBolsa: number;
    taraCaja: number;
    idUnimed: number;
    idFtoetq: number;
    diasVenc: number;
    pesmin: number;
    pesmax: number;
    activo: boolean;
    nsenasa?: string;
    temp?: string;
    ctrlPesomm: boolean;
    idGrpmat?: number;
    pesfijo?: number;
    estibamax?: number;
    idPrdfam?: number;
    [prop: string]: any;
    constructor(data?: Partial<AsProductos>);
}
export interface AsProductosRelations {
}
export declare type AsProductosWithRelations = AsProductos & AsProductosRelations;
