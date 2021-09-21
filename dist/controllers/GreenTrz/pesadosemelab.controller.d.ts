import { AsDetipal } from '../../models';
import { AsDetipalRepository, AsHdetipalRepository } from '../../repositories';
import { AsConspalRepository } from '../../repositories/as-conspal.repository';
export declare class PesadosemelabController {
    asdetipalRepo: AsDetipalRepository;
    ashdetipalRepo: AsHdetipalRepository;
    asconspalRepo: AsConspalRepository;
    AsDetipalRepository: any;
    constructor(asdetipalRepo: AsDetipalRepository, ashdetipalRepo: AsHdetipalRepository, asconspalRepo: AsConspalRepository);
    updateDetipal(idPlanta: number, numpal: number, idArea: number, body: AsDetipal): Promise<AsDetipal>;
    getDetipal(planta: number, desde: Date, hasta: Date): Promise<AsDetipal>;
    getTotalAConsumir(planta: number, fprodfam: number): Promise<String>;
    getTotalProducidoFinal(planta: number, fprodfam: number): Promise<String>;
    getTotalConsumidoFinal(planta: number, fprodfam: number): Promise<String>;
    deletePallet(planta: number, numpal: number, usuario: number): Promise<any>;
    getPalletsByNumpal(numpal: number): Promise<AsDetipal>;
    remanejar(numpal: number, data: any): Promise<any>;
    remanejarPallet(numpal: number, estado: number, data: any): Promise<any>;
    remanejarPalletParcial(numpal: number, estado: number, data: any): Promise<any>;
}
