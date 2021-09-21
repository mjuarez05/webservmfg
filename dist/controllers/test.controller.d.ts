import { AsProductosRepository } from '../repositories/as-productos.repository';
import { AsProductos } from '../models/as-productos.model';
export declare class TestController {
    asproductosRepository: AsProductosRepository;
    constructor(asproductosRepository: AsProductosRepository);
    getmodels(): Promise<string>;
    getProductosByPlant(id: typeof AsProductos.prototype.idPlanta): Promise<AsProductos[]>;
    getProductosByPlant2(id: typeof AsProductos.prototype.idPlanta): Promise<any>;
}
