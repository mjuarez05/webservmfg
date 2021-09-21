import { Entity } from '@loopback/repository';
export declare class KNA1 extends Entity {
    MANDT?: number;
    KUNNR?: number;
    NAME1?: number;
    constructor(data?: Partial<KNA1>);
}
export interface Kna1Relations {
}
export declare type Kna1WithRelations = KNA1 & Kna1Relations;
