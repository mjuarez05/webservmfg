import { Entity } from '@loopback/repository';
export declare class Rolemapping extends Entity {
    id: number;
    principaltype?: string;
    principalid?: string;
    roleid?: number;
    [prop: string]: any;
    constructor(data?: Partial<Rolemapping>);
}
export interface RolemappingRelations {
}
export declare type RolemappingWithRelations = Rolemapping & RolemappingRelations;
