import { Entity } from '@loopback/repository';
export declare class Accesstoken extends Entity {
    id: string;
    ttl?: number;
    scopes?: string;
    created?: string;
    userid?: number;
    [prop: string]: any;
    constructor(data?: Partial<Accesstoken>);
}
export interface AccesstokenRelations {
}
export declare type AccesstokenWithRelations = Accesstoken & AccesstokenRelations;
