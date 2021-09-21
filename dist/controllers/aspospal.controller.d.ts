/// <reference types="express" />
import { Request } from '@loopback/rest';
import { AsPospalRepository } from '../repositories/as-pospal.repository';
import { AsPospal } from '../models/as-pospal.model';
export declare class AsPospalExtendController {
    private req;
    aspospalRepository: AsPospalRepository;
    constructor(req: Request, aspospalRepository: AsPospalRepository);
    getPalletDesasociados(planta: typeof AsPospal.prototype.idPlanta, camara: typeof AsPospal.prototype.idCamara): Promise<any>;
}
