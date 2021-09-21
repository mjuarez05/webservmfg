import { Entity } from '@loopback/repository';
export declare class Prodfamilia extends Entity {
    id: number;
    idPlanta: number;
    descr: string;
    colorBack?: string;
    colorText?: string;
    [prop: string]: any;
    constructor(data?: Partial<Prodfamilia>);
}
export interface ProdfamiliaRelations {
}
export declare type ProdfamiliaWithRelations = Prodfamilia & ProdfamiliaRelations;
