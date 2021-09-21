/// <reference types="express" />
import { Request } from '@loopback/rest';
import { AsPospalRepository } from '../repositories/as-pospal.repository';
import { AsPospal } from '../models';
export declare class CamarasController {
    private req;
    aspospalRepository: AsPospalRepository;
    constructor(req: Request, aspospalRepository: AsPospalRepository);
    getPalletInCamara(planta: typeof AsPospal.prototype.idPlanta, numpal: typeof AsPospal.prototype.numpal): Promise<any>;
    getPalletsInCamaras(planta: typeof AsPospal.prototype.idPlanta): Promise<any>;
}
