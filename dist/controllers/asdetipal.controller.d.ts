/// <reference types="express" />
import { Request } from '@loopback/rest';
import { AsDetipalRepository } from '../repositories/as-detipal.repository';
import { AsDetipal } from '../models';
export declare class AsDetipalExtendController {
    private req;
    asdetipalRepository: AsDetipalRepository;
    constructor(req: Request, asdetipalRepository: AsDetipalRepository);
    getPalletDesasociados(planta: typeof AsDetipal.prototype.idPlanta, estados: typeof String): Promise<any>;
    getPalltes(planta: typeof AsDetipal.prototype.idPlanta, area: typeof AsDetipal.prototype.idArea, prod_desde: typeof AsDetipal.prototype.fecProd, prod_hasta: typeof AsDetipal.prototype.fecProd): Promise<any>;
    getPalletAConsumir(planta: typeof AsDetipal.prototype.idPlanta): Promise<any>;
    getPalletConsumidos(planta: typeof AsDetipal.prototype.idPlanta): Promise<any>;
    getPallet(numpal: typeof AsDetipal.prototype.numpal): Promise<any>;
    putEstadoPallet(numpal: typeof AsDetipal.prototype.numpal, estado: typeof AsDetipal.prototype.idEstado): Promise<any>;
    putPalletAConsParcial(numpal: typeof AsDetipal.prototype.numpal, estado: typeof AsDetipal.prototype.idEstado, data: any): Promise<any>;
}
