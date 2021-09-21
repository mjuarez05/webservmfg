import { Entity } from '@loopback/repository';
export declare class Acl extends Entity {
    model?: string;
    property?: string;
    accesstype?: string;
    permission?: string;
    principaltype?: string;
    principalid?: string;
    id: number;
    [prop: string]: any;
    constructor(data?: Partial<Acl>);
}
export interface AclRelations {
}
export declare type AclWithRelations = Acl & AclRelations;
