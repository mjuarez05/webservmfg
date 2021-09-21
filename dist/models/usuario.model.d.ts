import { Entity } from '@loopback/repository';
export declare class Usuario extends Entity {
    nombre?: string;
    apellido?: string;
    realm?: string;
    username?: string;
    password: string;
    email: string;
    emailverified?: boolean;
    verificationtoken?: string;
    id: number;
    [prop: string]: any;
    constructor(data?: Partial<Usuario>);
}
export interface UsuarioRelations {
}
export declare type UsuarioWithRelations = Usuario & UsuarioRelations;
