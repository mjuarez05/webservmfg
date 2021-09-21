/// <reference types="express" />
import { Request } from '@loopback/rest';
import { AsHdetipalRepository } from '../repositories/as-hdetipal.repository';
export declare class AsHDetipalExtendController {
    private req;
    asHdetipalRepository: AsHdetipalRepository;
    constructor(req: Request, asHdetipalRepository: AsHdetipalRepository);
}
