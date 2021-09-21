import { Entity } from '@loopback/repository';
export declare class Unimed extends Entity {
    id: number;
    decr: string;
    descrReduc: string;
    [prop: string]: any;
    constructor(data?: Partial<Unimed>);
}
export interface UnimedRelations {
}
export declare type UnimedWithRelations = Unimed & UnimedRelations;
