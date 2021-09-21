/// <reference types="express" />
import { Request } from '@loopback/rest';
export declare class BasculaController {
    private req;
    constructor(req: Request);
    getSapTest(ip: string, port: number): Promise<any>;
    vmGetPeso(ip: string, port: number): Promise<any>;
    sjGetPeso(ip: string, port: number): Promise<any>;
    baGetPeso(ip: string, port: number): Promise<any>;
    asGetPeso(ip: string, port: number): Promise<any>;
}
