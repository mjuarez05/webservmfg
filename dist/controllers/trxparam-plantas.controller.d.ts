import { Trxparam, Plantas } from '../models';
import { TrxparamRepository } from '../repositories';
export declare class TrxparamPlantasController {
    trxparamRepository: TrxparamRepository;
    constructor(trxparamRepository: TrxparamRepository);
    getPlantas(id: typeof Trxparam.prototype.id): Promise<Plantas>;
}
