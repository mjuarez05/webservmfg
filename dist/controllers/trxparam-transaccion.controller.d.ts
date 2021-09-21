import { Trxparam, Transaccion } from '../models';
import { TrxparamRepository } from '../repositories';
export declare class TrxparamTransaccionController {
    trxparamRepository: TrxparamRepository;
    constructor(trxparamRepository: TrxparamRepository);
    getTransaccion(id: typeof Trxparam.prototype.id): Promise<Transaccion>;
}
