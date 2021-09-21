import { Kna1Repository } from '../repositories';
export declare class SapController {
    kna1Repository: Kna1Repository;
    constructor(kna1Repository: Kna1Repository);
    getSapTest(mandt: number): Promise<any>;
}
